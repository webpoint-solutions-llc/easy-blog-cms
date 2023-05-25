import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';
import { BlogCategoryController } from './blog-category.controller';
import { BlogCategoryRepository } from './blog-category.repository';
import { BlogCategoryService } from './blog-category.service';
import {
    BlogCategory,
    BlogCategoryApiDatabaseName,
    BlogCategoryApiSchema,
} from './entities/blog-category.entity';
import { BlogModule } from '../blog/blog.module';
import { SeoSettingModule } from '../seo-setting/seo-setting.module';

@Module({
    controllers: [BlogCategoryController],
    providers: [BlogCategoryService, BlogCategoryRepository],
    exports: [BlogCategoryService],
    imports: [
        SeoSettingModule,
        forwardRef(() => BlogModule),
        MongooseModule.forFeature(
            [
                {
                    name: BlogCategory.name,
                    schema: BlogCategoryApiSchema,
                    collection: BlogCategoryApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class BlogCategoryModule {}
