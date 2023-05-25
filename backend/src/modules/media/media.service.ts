import { Model } from 'mongoose';
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media, MediaApiDocument } from './entities/media.entity';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { IDatabaseFindAllOptions } from '~/common/database/database.interface';
import { isValidObjectId } from '~/common/helper/helper.function';
import { ObjectID } from 'bson';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';

@Injectable()
export class MediaService {
    constructor(
        @DatabaseEntity(Media.name)
        private readonly mediaModel: Model<MediaApiDocument>
    ) {}

    async create(createMediaDto: CreateMediaDto) {
        const media = await new this.mediaModel(createMediaDto);
        return media.save();
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ) {
        const data = this.mediaModel.find(find);

        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            data.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            data.sort(options.sort);
        }

        return data.lean();
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.mediaModel.countDocuments(find);
    }

    async findOne(id: ObjectID) {
        const media = await this.mediaModel.findById(new ObjectID(id));
        if (!media) {
            throw new BadRequestException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_FORBIDDEN,
                message: 'Media not found',
            });
        }

        return media;
    }

    async update(id: ObjectID, updateMediaDto: UpdateMediaDto) {
        try {
            return await this.mediaModel.findOneAndUpdate(
                {
                    _id: new ObjectID(id),
                },
                {
                    $set: {
                        'file.title': updateMediaDto?.file?.title,
                        'file.description': updateMediaDto?.file?.description,
                        'file.alt': updateMediaDto?.file?.alt,
                        'file.seoCode': updateMediaDto?.file?.seoCode,
                    },
                },
                {
                    useFindAndModify: false,
                }
            );
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }
    remove(id: ObjectID) {
        return this.mediaModel.findByIdAndDelete(id);
    }
}
