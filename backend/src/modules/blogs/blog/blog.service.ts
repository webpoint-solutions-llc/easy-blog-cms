import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    PreconditionFailedException,
} from '@nestjs/common';
import moment from 'moment';
import { ObjectID } from 'bson';
import { Model } from 'mongoose';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { CommentService } from '../comment/comment.service';
import { Blog, BlogDocument } from './entities/blog.entity';
import { IBlogDocument } from './interfaces/blog.interface';
import { Media } from '~/modules/media/entities/media.entity';
import { Tag, TagDocument } from '../tag/entities/tag.entity';
import { UserEntity } from '~/modules/user/schemas/user.schema';
import { SeoSettingService } from '../seo-setting/seo-setting.service';
import { BlogCategoryService } from '../blog-category/blog-category.service';
import { SeoSettingRepository } from '../seo-setting/seo-setting.repository';
import { BlogCategory } from '../blog-category/entities/blog-category.entity';
import { IDatabaseFindAllOptions } from '~/common/database/database.interface';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';

@Injectable()
export class BlogService {
    constructor(
        @DatabaseEntity(Blog.name)
        private readonly blogModel: Model<BlogDocument>,
        @DatabaseEntity(Tag.name)
        private readonly tagModel: Model<TagDocument>,
        private readonly commentService: CommentService,
        private readonly blogCategoryService: BlogCategoryService,
        private readonly blogRepo: BlogRepository,
        private readonly seoSettingRepo: SeoSettingRepository,
        private readonly seoSettingService: SeoSettingService
    ) {}

    async create(createBlogDto: CreateBlogDto) {
        try {
            await this.blogRepo.create(createBlogDto);
        } catch (err) {
            if (err?.code === 11000) {
                const message = `Duplicate entry ${
                    Object.keys(err?.keyValue)[0] || ''
                }`;

                throw new InternalServerErrorException({
                    statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_PRECONDITION,
                    error: 'http.clientError.notAcceptable',
                    data: err?.keyValue,
                    message,
                });
            } else
                throw new InternalServerErrorException({
                    statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                    message: 'http.serverError.internalServerError',
                    error: err.message,
                });
        }
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ) {
        const blogs = this.blogModel
            .find(find)
            .populate({
                path: 'author',
                model: UserEntity.name,
                select: ['fullName', 'email'],
            })
            .populate({
                path: 'seoSetting',
                populate: [
                    {
                        path: 'categories',
                        model: BlogCategory.name,
                        strictPopulate: false,
                    },
                    {
                        path: 'tags',
                        model: Tag.name,
                    },
                ],
            })
            .populate({
                path: 'mediaList',
                model: Media.name,
                strictPopulate: false,
            });

        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            blogs.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            blogs.sort(options.sort);
        }

        let data = await blogs.lean();

        data = await Promise.all(
            data.map(async (row) => {
                const count = await this.commentService.getTotal({
                    blog: row._id,
                });

                row['totalComments'] = count || 0;
                return row;
            })
        );
        return data;
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.blogRepo.total(find);
    }

    async applyViewCounter(_id: ObjectID) {
        await this.blogModel.findOneAndUpdate(
            { _id },
            { $inc: { count: 1 } },
            { new: true, useFindAndModify: true }
        );
    }

    async getSeoSettingIds(
        find: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ) {
        // search with objectIds
        const seoSettingIds = await this.seoSettingService.findAll(
            find,
            options
        );

        const ids = Array.isArray(seoSettingIds)
            ? seoSettingIds.map((row) => row._id)
            : [];

        return ids;
    }

    async findOneBySlug(slug: string, count: boolean) {
        const seoSetting = await this.seoSettingRepo.findOne(
            { slug },
            { _id: 1 }
        );
        if (!seoSetting) throw new NotFoundException('Blog does not exist!');

        const blog: IBlogDocument = await this.blogModel
            .findOne({ seoSetting: seoSetting._id })
            .populate({ path: 'author', select: ['fullName', 'email'] })
            .populate({
                path: 'seoSetting',
                populate: [
                    {
                        path: 'categories',
                        model: BlogCategory.name,
                        strictPopulate: false,
                    },
                    {
                        path: 'tags',
                        model: Tag.name,
                    },
                ],
            })
            .populate({
                path: 'mediaList',
                model: Media.name,
                strictPopulate: false,
            })
            .lean();

        if (!blog) throw new NotFoundException('Blog does not exist!');

        const seoSettingIds = await this.getSeoSettingIds(
            {
                categories: {
                    $in: blog.seoSetting.categories.map((row) => row._id),
                },
            },
            {
                limit: 10,
                skip: 0,
            }
        );

        // remove current blog from list
        const filteredIds = seoSettingIds.filter(
            (row) => !new ObjectID(row).equals(seoSetting._id)
        );

        const suggestedBlogs = await this.findAll(
            {
                seoSetting: {
                    $in: filteredIds,
                },
                isDeleted: false,
                published: true,
            },
            { limit: 6, sort: { createdAt: -1 }, skip: 0 }
        );

        // Count number of blog
        if (count) await this.applyViewCounter(blog._id);

        const result = { ...blog, suggestedBlogs };

        return result;
    }

    async findOne(id: ObjectID, count: boolean) {
        const _id = new ObjectID(id);

        const blog = await this.blogModel
            .findById(_id)
            .populate({ path: 'author', select: ['fullName', 'email'] })
            .populate({
                path: 'seoSetting',
                populate: [
                    {
                        path: 'categories',
                        model: BlogCategory.name,
                        strictPopulate: false,
                    },
                    {
                        path: 'tags',
                        model: Tag.name,
                    },
                ],
            })
            .populate({
                path: 'mediaList',
                model: Media.name,
                strictPopulate: false,
            })
            .lean();

        const comments = await this.commentService.findAll(
            { blog: id },
            { limit: 100, skip: 0, sort: { createdAt: -1 } }
        );

        const suggestedBlogs = await this.findAll({}, { limit: 6, skip: 0 });

        if (!blog) throw new NotFoundException('Blog does not exist!');

        // Count number of blog
        if (count) await this.applyViewCounter(_id);

        const result = { ...blog, comments, suggestedBlogs };
        return result;
    }

    async findByUuid(id: string) {
        const blog = await this.blogModel
            .findOne({ blog_uuid: id })
            .populate({ path: 'author', select: ['fullName', 'email'] })
            .populate({
                path: 'seoSetting',
                populate: [
                    {
                        path: 'categories',
                        model: BlogCategory.name,
                        strictPopulate: false,
                    },
                    {
                        path: 'tags',
                        model: Tag.name,
                    },
                ],
            })
            .populate({
                path: 'mediaList',
                model: Media.name,
                strictPopulate: false,
            })
            .lean();

        return blog;
    }

    async convertTags(blogDto): Promise<string[]> {
        // created tags and if it exits add to blogs
        const isArray = Array.isArray(blogDto?.tags);
        if (!isArray) return [];

        const tags: string[] = await Promise.all(
            blogDto?.tags.map(async (name) => {
                const exit = await this.tagModel.findOne({
                    name: name.toLocaleLowerCase(),
                });

                if (!exit) {
                    const newTag = await this.tagModel.create({ name });
                    return newTag._id;
                }

                return exit._id;
            })
        );

        return tags;
    }

    async update(id: ObjectID | string, updateBlogDto: UpdateBlogDto) {
        const foundBlog = await this.blogModel.findById(id);
        const seoSettingDto = {
            title: updateBlogDto.title,
            url: updateBlogDto.url,
            meta_description: updateBlogDto.meta_description,
            keyword:
                updateBlogDto?.keyword === ''
                    ? undefined
                    : updateBlogDto?.keyword,
            categories: updateBlogDto?.categories,
            tags: updateBlogDto?.tags,
            author: updateBlogDto?.author,
            slug: updateBlogDto?.slug,
            creditTo: updateBlogDto?.creditTo,
        };

        // add lastpublished date if
        if (updateBlogDto?.published)
            updateBlogDto.lastPublishedDate = new Date();

        if (updateBlogDto?.published === false)
            updateBlogDto.lastDraftDate = new Date();

        // create if blog not found
        if (!foundBlog) {
            const seoSetting = await this.seoSettingService.create(
                seoSettingDto
            );
            updateBlogDto.seoSetting = seoSetting._id;

            await this.create(updateBlogDto as CreateBlogDto);
        } else {
            // update blog
            if (
                updateBlogDto?.published &&
                updateBlogDto?.action === 'VALIDATE_DRAFT'
            ) {
                const seoSetting = await this.seoSettingRepo.findOne(
                    {
                        blog: new ObjectID(id),
                    },
                    { _id: 1 }
                );
                const blog = await this.blogRepo.findOne({
                    _id: new ObjectID(id),
                });

                if (
                    !seoSetting?.title ||
                    !seoSetting?.meta_description ||
                    !seoSetting?.categories ||
                    !seoSetting?.tags
                ) {
                    throw new PreconditionFailedException(
                        'SeoSetting not filled properly'
                    );
                }

                if (
                    !(
                        blog.content.length > 1 &&
                        blog.hero?.image &&
                        blog.hero?.thumbnail &&
                        (blog.cta.employee?.image ||
                            blog.cta.employer?.image) &&
                        blog?.infographic
                    )
                ) {
                    throw new PreconditionFailedException(
                        'Blog not filled properly'
                    );
                }
            }

            const tags = await this.convertTags(updateBlogDto);
            seoSettingDto['tags'] = tags.length > 0 ? tags : undefined;

            try {
                const blog = await this.blogRepo.findOneAndUpdate(
                    {
                        _id: new ObjectID(id),
                    },
                    {
                        $set: updateBlogDto,
                    }
                );

                await this.seoSettingRepo.findOneAndUpdate(
                    {
                        _id: new ObjectID(foundBlog.seoSetting),
                    },
                    {
                        $set: seoSettingDto,
                    }
                );
                return blog;
            } catch (err) {
                if (err?.code === 11000) {
                    const message = `Duplicate entry ${
                        Object.keys(err?.keyValue)[0] || ''
                    }`;

                    throw new InternalServerErrorException({
                        statusCode:
                            ENUM_ERROR_STATUS_CODE_ERROR.ERROR_PRECONDITION,
                        error: 'http.clientError.notAcceptable',
                        data: err?.keyValue,
                        message,
                    });
                } else
                    throw new InternalServerErrorException({
                        statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                        message: 'http.serverError.internalServerError',
                        error: err.message,
                    });
            }
        }
    }

    async remove(id: ObjectID, deletePermanently?: boolean) {
        if (deletePermanently) {
            const blog = await this.blogRepo.findById(new ObjectID(id));
            if (!blog) throw new NotFoundException('Blog does not exist!');

            await this.seoSettingRepo.deleteOneById(
                new ObjectID(blog.seoSetting._id)
            );
            return await this.blogRepo.deleteOneById(new ObjectID(id));
        } else
            return await this.blogRepo.findOneAndUpdate(
                { _id: new ObjectID(id) },
                {
                    $set: { isDeleted: true },
                }
            );
    }

    async countByBlogCategory(id: ObjectID) {
        return await this.blogModel.count({
            blogCategory: id,
        });
    }

    async getActivityInsights(from, to) {
        // today date
        const now = new Date();
        const startOfToday = {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
            $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        };

        function customDateColumn(name: string) {
            // activity - range date
            const dates_between =
                from && to
                    ? {
                          [name]: {
                              $gte: moment(from).startOf('day'),
                              $lt: moment(to).endOf('day'),
                          },
                      }
                    : {};

            return dates_between;
        }

        // activity - range date
        const dates_between =
            from && to
                ? {
                      createdAt: {
                          $gte: moment(from).startOf('day'),
                          $lt: moment(to).endOf('day'),
                      },
                  }
                : {};

        // get blogs
        const blogPublishedDate = await this.findAll(
            {
                isDeleted: false,
                published: true,
                ...customDateColumn('lastPublishedDate'),
            },
            { limit: 10, skip: 0, sort: { lastPublishedDate: -1 } }
        );

        const blogDraftDate = await this.findAll(
            {
                isDeleted: false,
                published: false,
                ...customDateColumn('lastDraftDate'),
            },
            { limit: 10, skip: 0, sort: { lastDraftDate: -1 } }
        );

        const blogs = [...blogPublishedDate, ...blogDraftDate];

        const totalBlogs = await this.getTotal({});

        // blog publish
        const [VarTotalBlogPublished, todayBlogPublished] = await Promise.all([
            await this.getTotal({
                published: true,
                isDeleted: false,
                ...customDateColumn('lastPublishedDate'),
            }),
            await this.getTotal({
                published: true,
                isDeleted: false,
                lastPublishedDate: startOfToday,
            }),
        ]);

        // draft
        const [VarTotalDraftUnpublished, totalDraftUnpublished]: [
            number,
            number
        ] = await Promise.all([
            await this.getTotal({
                published: false,
                isDeleted: false,
                ...customDateColumn('lastDraftDate'),
            }),
            await this.getTotal({
                published: false,
                isDeleted: false,
                lastDraftDate: startOfToday,
            }),
        ]);

        // comments
        const [totalComments, todayComments] = await Promise.all([
            this.commentService.getTotal({
                ...dates_between,
            }),
            this.commentService.getTotal({
                createdAt: startOfToday,
            }),
        ]);

        // insights
        const [
            totalBlogsCategory,
            totalBlogsDraft,
            totalBlogPublished,
            tagsCount,
        ] = await Promise.all([
            await this.blogCategoryService.getTotal({}),
            await this.getTotal({
                published: false,
                isDeleted: false,
            }),
            await this.getTotal({
                published: true,
                isDeleted: false,
            }),
            await this.tagModel.countDocuments(),
        ]);
        const totalPercentage =
            totalBlogPublished +
            tagsCount +
            totalBlogsCategory +
            totalBlogsDraft;
        return {
            overviewCard: [
                {
                    title: 'Total blogs published',
                    count: VarTotalBlogPublished,
                    todayCount: `${todayBlogPublished} today`,
                    todayDetail: 'Blogs published today',
                },
                {
                    title: 'Blogs in drafts',
                    count: VarTotalDraftUnpublished,
                    todayCount: `${totalDraftUnpublished} today`,
                    todayDetail: 'Blogs added today',
                },
                {
                    title: 'Total comments',
                    count: totalComments,
                    todayCount: `${todayComments} today`,
                    todayDetail: 'Total comments received today',
                },
            ],

            insights: [
                {
                    percent:
                        totalPercentage /
                            (totalPercentage - totalBlogPublished) +
                        '%',
                    title: 'Total blogs published',
                    value: totalBlogPublished,
                },
                {
                    percent:
                        totalPercentage / (totalPercentage - tagsCount) + '%',
                    title: 'Tag count',
                    value: tagsCount,
                },
                {
                    percent:
                        totalPercentage /
                            (totalPercentage - totalBlogsCategory) +
                        '%',
                    title: 'Category count',
                    value: totalBlogsCategory,
                },
                {
                    percent:
                        totalPercentage / (totalPercentage - totalBlogsDraft) +
                        '%',
                    title: 'Total blogs in draft',
                    value: totalBlogsDraft,
                },
            ],

            blogs: {
                data: blogs,
                total: totalBlogs,
            },
        };
    }
}
