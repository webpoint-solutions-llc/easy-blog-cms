import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { EntityRepository } from '~/common/database/entity.repository';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { SeoSetting, SeoSettingDocument } from './entities/seo-setting.entity';

@Injectable()
export class SeoSettingRepository extends EntityRepository<SeoSettingDocument> {
    constructor(
        @DatabaseEntity(SeoSetting.name)
        seoSettingModel: Model<SeoSettingDocument>
    ) {
        super(seoSettingModel);
    }
}
