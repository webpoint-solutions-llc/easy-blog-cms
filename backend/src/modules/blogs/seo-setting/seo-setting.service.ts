import { ObjectID } from 'bson';
import { Model } from 'mongoose';
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { SeoSettingRepository } from './seo-setting.repository';
import { UserEntity } from '~/modules/user/schemas/user.schema';
import { CreateSeoSettingDto } from './dto/create-seo-setting.dto';
import { UpdateSeoSettingDto } from './dto/update-seo-setting.dto';
import { Tag, TagApiSchema, TagDocument } from '../tag/entities/tag.entity';
import { BlogCategory } from '../blog-category/entities/blog-category.entity';
import { IDatabaseFindAllOptions } from '~/common/database/database.interface';
import { SeoSetting, SeoSettingDocument } from './entities/seo-setting.entity';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';
@Injectable()
export class SeoSettingService {
    constructor(
        private readonly seoSettingRepo: SeoSettingRepository,
        @DatabaseEntity(SeoSetting.name)
        private readonly seoSettingModel: Model<SeoSettingDocument>,
        @DatabaseEntity(Tag.name)
        private readonly tagModel: Model<TagDocument>
    ) {}

    async create(createSeoSettingDto: CreateSeoSettingDto) {
        const tags = await this.convertTags(createSeoSettingDto);
        createSeoSettingDto.tags = tags.length > 0 ? tags : undefined;
        try {
            return await this.seoSettingRepo.create(createSeoSettingDto);
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

    async convertTags(blogDto): Promise<string[]> {
        // created tags and if it exits add to blogs
        const isArray = Array.isArray(blogDto?.tags);
        if (!isArray) return undefined;

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

    async countCategories(id: ObjectID) {
        return await this.seoSettingModel.aggregate([
            {
                $unwind: {
                    path: '$categories',
                },
            },
            {
                $group: {
                    _id: '$categories',
                    count: {
                        $sum: 1,
                    },
                },
            },
            {
                $match: {
                    _id: new ObjectID(id),
                },
            },
        ]);
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ) {
        const result = this.seoSettingModel
            .find(find)
            .populate({
                path: 'tags',
                model: Tag.name,
                select: 'name',
            })
            .populate({
                path: 'author',
                model: UserEntity.name,
                select: ['fullName', 'email'],
            })
            .populate({ path: 'categories', model: BlogCategory.name });

        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            result.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            result.sort(options.sort);
        }

        return result.lean();
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.seoSettingRepo.total(find);
    }

    async findOne(id: ObjectID) {
        const seoSetting = await this.seoSettingRepo.findById(new ObjectID(id));
        if (!seoSetting) {
            throw new NotFoundException('Seo Setting not found');
        }

        return seoSetting;
    }

    async update(id: ObjectID, updateSeoSettingDto: UpdateSeoSettingDto) {
        const _id = new ObjectID(id);

        updateSeoSettingDto.tags = await this.convertTags(updateSeoSettingDto);

        return await this.seoSettingRepo.findOneAndUpdate(
            {
                _id,
            },
            {
                $set: updateSeoSettingDto,
            }
        );
    }

    async remove(id: ObjectID) {
        return await this.seoSettingRepo.deleteOneById(id);
    }
}
