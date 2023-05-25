import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from '~/common/database/entity.repository';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { Blog, BlogDocument } from './entities/blog.entity';

@Injectable()
export class BlogRepository extends EntityRepository<BlogDocument> {
    constructor(
        @DatabaseEntity(Blog.name)
        blogModel: Model<BlogDocument>
    ) {
        super(blogModel);
    }
}
