import {
    Tag,
    TagApiDatabaseName,
    TagApiSchema,
} from '../tag/entities/tag.entity';
import {
    SeoSetting,
    SeoSettingApiDatabaseName,
    SeoSettingApiSchema,
} from './entities/seo-setting.entity';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeoSettingService } from './seo-setting.service';
import { SeoSettingRepository } from './seo-setting.repository';
import { SeoSettingController } from './seo-setting.controller';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';

@Module({
    controllers: [SeoSettingController],
    providers: [SeoSettingService, SeoSettingRepository],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: SeoSetting.name,
                    schema: SeoSettingApiSchema,
                    collection: SeoSettingApiDatabaseName,
                },
                {
                    name: Tag.name,
                    schema: TagApiSchema,
                    collection: TagApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
    exports: [SeoSettingService, SeoSettingRepository],
})
export class SeoSettingModule {}
