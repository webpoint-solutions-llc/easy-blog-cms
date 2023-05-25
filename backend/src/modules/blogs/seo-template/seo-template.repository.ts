import {
    SeoTemplate,
    SeoTemplateDocument,
} from './entities/seo-template.entity';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { EntityRepository } from '~/common/database/entity.repository';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';

@Injectable()
export class SeoTemplateRepository extends EntityRepository<SeoTemplateDocument> {
    constructor(
        @DatabaseEntity(SeoTemplate.name)
        seoTemplateModel: Model<SeoTemplateDocument>
    ) {
        super(seoTemplateModel);
    }
}
