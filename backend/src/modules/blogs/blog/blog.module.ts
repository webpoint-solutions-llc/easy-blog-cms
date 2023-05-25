import { HttpModule } from '@nestjs/axios';
import { BlogService } from './blog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogController } from './blog.controller';
import { BlogRepository } from './blog.repository';
import { Module, forwardRef } from '@nestjs/common';
import { CommentModule } from '../comment/comment.module';
import { CommentService } from '../comment/comment.service';
import { BlogCategoryModule } from '../blog-category/blog-category.module';
import { BlogUniqueValidator } from './decorators/BlogUniqueValidator.decorators';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';
import {
    BlogCategory,
    BlogCategoryApiDatabaseName,
    BlogCategoryApiSchema,
} from '../blog-category/entities/blog-category.entity';
import {
    Comment,
    CommentApiSchema,
    CommentApiDatabaseName,
} from '../comment/entities/comment.entity';
import {
    Blog,
    BlogApiDatabaseName,
    BlogApiSchema,
} from './entities/blog.entity';
import {
    Tag,
    TagApiDatabaseName,
    TagApiSchema,
} from '../tag/entities/tag.entity';
import { CommentRepository } from '../comment/comment.repository';
import { SeoSettingModule } from '../seo-setting/seo-setting.module';

@Module({
    controllers: [BlogController],
    providers: [
        BlogService,
        CommentService,
        BlogUniqueValidator,
        BlogRepository,
        CommentRepository,
    ],
    exports: [BlogService],
    imports: [
        HttpModule,
        SeoSettingModule,
        CommentModule,
        forwardRef(() => BlogCategoryModule),
        MongooseModule.forFeature(
            [
                {
                    name: Blog.name,
                    schema: BlogApiSchema,
                    collection: BlogApiDatabaseName,
                },
                {
                    name: Tag.name,
                    schema: TagApiSchema,
                    collection: TagApiDatabaseName,
                },
                {
                    name: Comment.name,
                    schema: CommentApiSchema,
                    collection: CommentApiDatabaseName,
                },
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
export class BlogModule {}
