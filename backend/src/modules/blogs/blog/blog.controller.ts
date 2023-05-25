import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    Query,
    Res,
    Session,
} from '@nestjs/common';
import { ObjectID } from 'bson';
import { Types } from 'mongoose';
import { RealIP } from 'nestjs-real-ip';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import { BlogListDto } from './dto/blog.list.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { DeleteBlogDto } from './dto/delete-blog.dto';
import { CommentService } from '../comment/comment.service';
import { User } from '~/common/auth/decorators/auth.decorator';
import { ValidateObjectId } from '~/common/helper/helper.function';
import { IResponsePaging } from '~/common/response/response.interface';
import { SeoSettingService } from '../seo-setting/seo-setting.service';
import { HelperFileService } from '~/common/helper/services/helper.file.service';
import { PaginationService } from '~/common/pagination/services/pagination.service';
import {
    SearchFilterArrayInDecorator,
    SearchFilterDateGtLtDecorator,
} from '~/common/decorators/search.decorator';
import {
    Response,
    ResponsePaging,
} from '~/common/response/decorators/response.decorator';
import { AuthJwtGuard } from '~/common/auth/decorators/auth.jwt.decorator';
@ApiTags('modules.blog')
@Controller('blog')
export class BlogController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly blogService: BlogService,
        private readonly helperFileService: HelperFileService,
        private readonly seoServiceSetting: SeoSettingService,
        private readonly commentService: CommentService
    ) {}

    @Response('blog.create')
    @AuthJwtGuard()
    @Post()
    async create(
        @Body() createBlogDto: CreateBlogDto,
        @User('_id') _id: Types.ObjectId
    ) {
        createBlogDto.author = createBlogDto?.author || [_id];
        return await this.blogService.create(createBlogDto);
    }

    @Response('blog.list')
    @Get()
    findAll() {
        return this.blogService.findAll();
    }

    @Response('blog.list')
    @AuthJwtGuard()
    @Get('blog.overview')
    overview(@Query() { from, to }) {
        return this.blogService.getActivityInsights(from, to);
    }

    @ResponsePaging('blog.list')
    @Get('blog.list')
    async list(
        @SearchFilterDateGtLtDecorator('createdAt')
        createdAt: Record<string, any>,

        @SearchFilterArrayInDecorator('blogCategory')
        blogCategory: Record<string, any>,

        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
            content,
            keyword,
            author,
        }: BlogListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);

        // filter option for published, drafts and trash
        let contentSearch: Record<string, boolean> = { isDeleted: false };
        if (content === 'published')
            contentSearch = { ...contentSearch, published: true };
        else if (content === 'drafts')
            contentSearch = { ...contentSearch, published: false };
        else if (content === 'trash') contentSearch = { isDeleted: true };

        // search with objectIds
        const seoSettingIds = await this.seoServiceSetting.findAll({
            ...search,
        });

        const ids = Array.isArray(seoSettingIds)
            ? seoSettingIds.map((row) => row._id)
            : [];

        const find: Record<string, any> = {
            ...(search ? { seoSetting: { $in: ids } } : {}), // search in seoSetting
            ...(createdAt || {}),
            ...(content ? contentSearch : {}),
            ...(keyword ? { keyword } : {}),
            ...(author ? { author } : {}),
            ...blogCategory,
        };

        const blogs = await this.blogService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });

        const totalData: number = await this.blogService.getTotal(find);
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data: blogs,
        };
    }

    @AuthJwtGuard()
    @Response('blog.get')
    @Get('blog.export')
    async export(@Res() res) {
        const blogs: any = await this.blogService.findAll();

        const formattedBlogs = blogs.map((row) => {
            row['title'] = row?.seoSetting?.title;
            row['keyword'] = row?.seoSetting?.keyword;
            row['url'] = row?.seoSetting?.url;
            row['meta_description'] = row?.seoSetting?.meta_description;
            row['tags'] = row?.seoSetting?.tags
                .map((ele) => ele?.name)
                .join(', ');
            row['categories'] = row?.seoSetting?.categories
                .map((ele) => ele?.name)
                .join(', ');
            row['publish_status'] = row.isDeleted
                ? 'Deleted'
                : row.published
                ? 'Published'
                : 'Draft';

            return row;
        });

        try {
            const headers = [
                'title',
                'url',
                'keyword',
                'meta_description',
                'publish_status',
                'count',
                'updated_at',
                'createdAt',
                'updatedAt',
            ];

            const path = await this.helperFileService.writeSimpleExcel(
                formattedBlogs,
                headers
            );

            return res.download(path);
        } catch (err) {
            console.error(err);
        }

        return 'No data found';
    }

    @Response('blog.get')
    @Get(':id')
    findOne(
        @Param('id', new ValidateObjectId()) id: ObjectID,
        @Session() session: Record<string, any>,
        @RealIP() ip: string
    ) {
        const applyIncreaseCounter: boolean =
            Array.isArray(session.visits) && session.visits.includes(ip)
                ? false
                : true;

        session.visits = session.visits
            ? session.visits.includes(ip)
                ? session.visits
                : [...session.visits, ip]
            : [ip];

        return this.blogService.findOne(id, applyIncreaseCounter);
    }

    @Response('blog.get')
    @Get('blog.single/:id')
    findBlogBySlug(
        @Param('id') keyword,
        @Session() session: Record<string, any>,
        @RealIP() ip: string
    ) {
        const applyIncreaseCounter: boolean =
            Array.isArray(session.visits) && session.visits.includes(ip)
                ? false
                : true;

        session.visits = session.visits
            ? session.visits.includes(ip)
                ? session.visits
                : [...session.visits, ip]
            : [ip];

        return this.blogService.findOneBySlug(keyword, applyIncreaseCounter);
    }

    @Response('blog.get')
    @Get('findByBlogUuid/:id')
    async findOneByUniqueIdentifier(@Param('id') id: string) {
        const blog = await this.blogService.findByUuid(id);
        if (!blog) throw new NotFoundException('Blog does not exist!');
        return blog;
    }

    @Response('blog.update')
    @Patch('update')
    @AuthJwtGuard()
    async createUpdateBlog(
        @Body() updateBlogDto: UpdateBlogDto,
        @User('_id') _id: Types.ObjectId
    ) {
        updateBlogDto.author = [_id];
        const blog = await this.blogService.findByUuid(updateBlogDto.blog_uuid);

        return this.blogService.update(blog?._id, updateBlogDto);
    }

    @Response('blog.update')
    @AuthJwtGuard()
    @Patch(':id')
    update(
        @Param('id', new ValidateObjectId()) id: ObjectID,
        @Body() updateBlogDto: UpdateBlogDto
    ) {
        return this.blogService.update(id, updateBlogDto);
    }

    @Response('blog.remove')
    @AuthJwtGuard()
    @Delete(':id')
    remove(
        @Param('id', new ValidateObjectId()) id: ObjectID,
        @Body() deleteBlogDto: DeleteBlogDto
    ) {
        return this.blogService.remove(id, deleteBlogDto.deletePermanently);
    }
}
