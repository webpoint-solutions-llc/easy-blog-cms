import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { ObjectID } from 'bson';
import { HttpService } from '@nestjs/axios';
import { Model } from 'mongoose';
import { IDatabaseFindAllOptions } from '~/common/database/database.interface';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Blog, BlogDocument } from '../blog/entities/blog.entity';
import { CommentRepository } from './comment.repository';
import { DeleteCommentDto } from './dto/delete-comment.dto';
@Injectable()
export class CommentService {
    constructor(
        @DatabaseEntity(Blog.name)
        private readonly blogModal: Model<BlogDocument>,
        private readonly httpService: HttpService,
        private readonly commentRepo: CommentRepository
    ) {}

    async create(createCommentDto: CreateCommentDto) {
        if (process.env.OFFENSIVE_FILTER_URL) {
            // request for offensive words
            const { data }: any = await this.httpService.axiosRef.post(
                process.env.OFFENSIVE_FILTER_URL,
                {
                    chat: createCommentDto.message.toLocaleLowerCase(),
                }
            );

            if (data?.offensive == true)
                throw new BadRequestException({
                    statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_FORBIDDEN,
                    message: 'Your comment contain offensive words.',
                });
        }

        const comment = await this.commentRepo.create(createCommentDto);

        await this.blogModal.findByIdAndUpdate(
            createCommentDto.blog,
            {
                $push: { comments: comment._id },
            },
            { new: true, useFindAndModify: false }
        );

        return comment;
    }

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ) {
        return this.commentRepo.paginate(find, options);
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.commentRepo.total(find);
    }

    async findOne(id: ObjectID) {
        const blog = await this.commentRepo.findById(new ObjectID(id));
        if (!blog) {
            throw new BadRequestException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_FORBIDDEN,
                message: 'Blog categroy not found',
            });
        }

        return blog;
    }

    async update(id: ObjectID, updateCommentDto: UpdateCommentDto) {
        try {
            return await this.commentRepo.findOneAndUpdate(
                {
                    _id: new ObjectID(id),
                },
                {
                    $set: updateCommentDto,
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

    async remove(id: ObjectID) {
        await this.commentRepo.deleteOneById(id);
    }
}
