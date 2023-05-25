import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AwsModule } from '~/common/aws/aws.module';
import { MediaController } from './media.controller';
import {
    Media,
    MediaApiDatabaseName,
    MediaApiSchema,
} from './entities/media.entity';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';

@Module({
    controllers: [MediaController],
    providers: [MediaService],
    imports: [
        AwsModule,
        UserModule,
        MongooseModule.forFeature(
            [
                {
                    name: Media.name,
                    schema: MediaApiSchema,
                    collection: MediaApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class MediaModule {}
