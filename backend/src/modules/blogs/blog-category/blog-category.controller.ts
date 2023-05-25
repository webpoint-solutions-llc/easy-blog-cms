import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {
    Response,
    ResponsePaging,
} from '~/common/response/decorators/response.decorator';
import { ObjectID } from 'bson';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from '../blog/blog.service';
import { BlogCategoryService } from './blog-category.service';
import { ValidateObjectId } from '~/common/helper/helper.function';
import { BlogCategoryListDto } from './dto/blog-category.list.dto';
import { IResponsePaging } from '~/common/response/response.interface';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { UpdateBlogCategoryDto } from './dto/update-blog-category.dto';
import { SeoSettingService } from '../seo-setting/seo-setting.service';
import { AuthJwtGuard } from '~/common/auth/decorators/auth.jwt.decorator';
import { PaginationService } from '~/common/pagination/services/pagination.service';

@ApiTags('modules.blog-category')
@Controller('blog-category')
export class BlogCategoryController {
    constructor(
        private readonly blogService: BlogService,
        private readonly blogCategoryService: BlogCategoryService,
        private readonly paginationService: PaginationService,
        private readonly seoSettingService: SeoSettingService
    ) {}

    @Response('blogCategory.create')
    @AuthJwtGuard()
    @Post()
    create(@Body() createBlogCategoryDto: CreateBlogCategoryDto) {
        return this.blogCategoryService.create(createBlogCategoryDto);
    }

    @Response('blogCategory.list')
    @AuthJwtGuard()
    @Get()
    findAll() {
        return this.blogCategoryService.findAll();
    }

    @ResponsePaging('blogCategory.list')
    @AuthJwtGuard()
    @Get('blog-category.list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
        }: BlogCategoryListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
        };
        let blogsCategories = await this.blogCategoryService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });

        // count number of blogCategory used in blogs
        blogsCategories = await Promise.all(
            blogsCategories.map(async (row) => {
                const count = await this.seoSettingService.countCategories(
                    row._id
                );
                row['count'] =
                    Array.isArray(count) && count.length > 0
                        ? count[0]?.count
                        : 0;
                return row;
            })
        );

        const totalData: number = await this.blogCategoryService.getTotal(find);
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
            data: blogsCategories,
        };
    }

    @Response('blogCategory.get')
    @AuthJwtGuard()
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    findOne(@Param('id', new ValidateObjectId()) id: ObjectID) {
        return this.blogCategoryService.findOne(id);
    }

    @Response('blogCategory.update')
    @AuthJwtGuard()
    @Patch(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Param('id', new ValidateObjectId()) id: ObjectID,
        @Body() updateBlogCategoryDto: UpdateBlogCategoryDto
    ) {
        return this.blogCategoryService.update(id, updateBlogCategoryDto);
    }

    @Response('blogCategory.remove')
    @AuthJwtGuard()
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete(':id')
    remove(@Param('id', new ValidateObjectId()) id: ObjectID) {
        return this.blogCategoryService.remove(id);
    }
}
