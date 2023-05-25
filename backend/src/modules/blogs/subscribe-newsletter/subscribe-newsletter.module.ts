import { Module } from '@nestjs/common';
import { SubscribeNewsletterService } from './subscribe-newsletter.service';
import { SubscribeNewsletterController } from './subscribe-newsletter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
    SubscribeNewsletter,
    SubscribeNewsletterApiDatabaseName,
    SubscribeNewsletterApiSchema,
} from './entities/subscribe-newsletter.entity';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';
import { UniqueValidator } from './decorators/UniqueValidator.decorators';

@Module({
    controllers: [SubscribeNewsletterController],
    providers: [SubscribeNewsletterService, UniqueValidator],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: SubscribeNewsletter.name,
                    schema: SubscribeNewsletterApiSchema,
                    collection: SubscribeNewsletterApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class SubscribeNewsletterModule {}
