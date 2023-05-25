import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagApiDatabaseName, TagApiSchema } from './entities/tag.entity';
import { DATABASE_CONNECTION_NAME } from '~/common/database/constants/database.constant';
import { TagRepository } from './tag.repository';

@Module({
    controllers: [TagController],
    providers: [TagService, TagRepository],
    imports: [
        MongooseModule.forFeature(
            [
                {
                    name: Tag.name,
                    schema: TagApiSchema,
                    collection: TagApiDatabaseName,
                },
            ],
            DATABASE_CONNECTION_NAME
        ),
    ],
})
export class TagModule {}
