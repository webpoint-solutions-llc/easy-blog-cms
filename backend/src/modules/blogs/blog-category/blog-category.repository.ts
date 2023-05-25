import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { EntityRepository } from '~/common/database/entity.repository';
import {
    BlogCategory,
    BlogCategoryDocument,
} from './entities/blog-category.entity';

@Injectable()
export class BlogCategoryRepository extends EntityRepository<BlogCategoryDocument> {
    constructor(
        @DatabaseEntity(BlogCategory.name)
        blogCatModel: Model<BlogCategoryDocument>
    ) {
        super(blogCatModel);
    }
}
