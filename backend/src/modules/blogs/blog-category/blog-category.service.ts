import { ObjectID } from 'bson';
import { BlogCategoryRepository } from './blog-category.repository';
import { BlogCategoryFoundException } from './exceptions/not-found';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SeoSettingRepository } from '../seo-setting/seo-setting.repository';
import { IDatabaseFindAllOptions } from '~/common/database/database.interface';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';
import { SeoSettingService } from '../seo-setting/seo-setting.service';
@Injectable()
export class BlogCategoryService {
    constructor(
        private readonly blogCategoryRepo: BlogCategoryRepository,
        private readonly seoSettingService: SeoSettingService
    ) {}

    async create(createBlogCategoryDto: CreateBlogCategoryDto) {
        try {
            return await this.blogCategoryRepo.create(createBlogCategoryDto);
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
        return this.blogCategoryRepo.paginate(find, options);
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.blogCategoryRepo.total(find);
    }

    async findOne(id: ObjectID) {
        const blogCategory = await this.blogCategoryRepo.findById(
            new ObjectID(id)
        );
        if (!blogCategory) {
            throw new BlogCategoryFoundException();
        }

        return blogCategory;
    }

    async update(id: ObjectID, updateBlogCategoryDto: UpdateBlogCategoryDto) {
        const _id = new ObjectID(id);

        return await this.blogCategoryRepo.findOneAndUpdate(
            {
                _id,
            },
            {
                $set: updateBlogCategoryDto,
            }
        );
    }

    async remove(id: ObjectID) {
        const notFound = await this.seoSettingService.countCategories(id);
        if (
            Array.isArray(notFound) &&
            notFound.length > 0 &&
            notFound[0].count > 0
        )
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_PRECONDITION,
                message: 'Cannot delete, in use by blog.',
                error: 'http.clientError.notAcceptable',
            });
        else return await this.blogCategoryRepo.deleteOneById(id);
    }
}
