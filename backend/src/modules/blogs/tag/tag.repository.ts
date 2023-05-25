import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { EntityRepository } from '~/common/database/entity.repository';
import { Tag, TagDocument } from './entities/tag.entity';

@Injectable()
export class TagRepository extends EntityRepository<TagDocument> {
    constructor(
        @DatabaseEntity(Tag.name)
        blogCatModel: Model<TagDocument>
    ) {
        super(blogCatModel);
    }
}
