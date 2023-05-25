import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
    Comment,
    CommentApiDatabaseName,
    CommentApiSchema,
} from './entities/comment.entity';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';
import { HttpModule } from '@nestjs/axios';
import {
    Blog,
    BlogApiDatabaseName,
    BlogApiSchema,
} from '../blog/entities/blog.entity';
import { CommentRepository } from './comment.repository';
import { BlogRepository } from '../blog/blog.repository';

@Module({
    controllers: [CommentController],
    providers: [CommentService, CommentRepository, BlogRepository],
    exports: [CommentService],
    imports: [
        HttpModule,
        MongooseModule.forFeature(
            [
                {
                    name: Comment.name,
                    schema: CommentApiSchema,
                    collection: CommentApiDatabaseName,
                },
                {
                    name: Blog.name,
                    schema: BlogApiSchema,
                    collection: BlogApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class CommentModule {}
