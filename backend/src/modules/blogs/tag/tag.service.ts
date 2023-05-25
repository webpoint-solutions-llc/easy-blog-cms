import { ObjectID } from 'bson';
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { IDatabaseFindAllOptions } from '~/common/database/database.interface';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';

@Injectable()
export class TagService {
    constructor(private readonly tagRepo: TagRepository) {}

    async create(createTagDto: CreateTagDto) {
        try {
            return await this.tagRepo.create(createTagDto);
        } catch (err) {
            if (err?.code === 11000) {
                const message = `Duplicate entry ${
                    Object.keys(err?.keyValue)[0] || ''
                }`;

                throw new InternalServerErrorException({
                    statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                    error: 'http.clientError.notAcceptable',
                    data: err?.keyValue,
                    message,
                });
            } else
                throw new InternalServerErrorException({
                    statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                    message: 'http.serverError.internalServerError',
                    error: err.message,
                });
        }
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ) {
        return this.tagRepo.paginate(find, options);
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.tagRepo.total(find);
    }

    async findOne(id: ObjectID) {
        const data = await this.tagRepo.findById(new ObjectID(id));
        if (!data) {
            throw new NotFoundException('Tag Not Found');
        }

        return data;
    }

    async update(id: ObjectID, updateTagDto: UpdateTagDto) {
        const _id = new ObjectID(id);

        return await this.tagRepo.findOneAndUpdate(
            {
                _id,
            },
            {
                $set: updateTagDto,
            }
        );
    }

    async remove(id: ObjectID) {
        return await this.tagRepo.deleteOneById(id);
    }
}
