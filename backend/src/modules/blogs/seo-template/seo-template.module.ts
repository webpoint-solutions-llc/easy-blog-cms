import { Module } from '@nestjs/common';
import { SeoTemplateService } from './seo-template.service';
import { SeoTemplateController } from './seo-template.controller';
import { SeoTemplateRepository } from './seo-template.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
    SeoSettingApiDatabaseName,
    SeoSettingApiSchema,
    SeoTemplate,
} from './entities/seo-template.entity';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';

@Module({
    controllers: [SeoTemplateController],
    providers: [SeoTemplateService, SeoTemplateRepository],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: SeoTemplate.name,
                    schema: SeoSettingApiSchema,
                    collection: SeoSettingApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class SeoTemplateModule {}
