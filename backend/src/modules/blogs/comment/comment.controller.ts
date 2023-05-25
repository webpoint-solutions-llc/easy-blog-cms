import {
    Response,
    ResponsePaging,
} from '~/common/response/decorators/response.decorator';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { ObjectID } from 'bson';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentListDto } from './dto/comment.list.dto';
import { BlogRepository } from '../blog/blog.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { ValidateObjectId } from '~/common/helper/helper.function';
import { IResponsePaging } from '~/common/response/response.interface';
import { PaginationService } from '~/common/pagination/services/pagination.service';
import { SearchFilterDateGtLtDecorator } from '~/common/decorators/search.decorator';

@ApiTags('modules.comment')
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly paginationService: PaginationService,
        private readonly blogRepo: BlogRepository
    ) {}

    @Response('comment.create')
    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentService.create(createCommentDto);
    }

    @Response('comment.list')
    @Get()
    findAll() {
        return this.commentService.findAll();
    }

    @ResponsePaging('comment.list')
    @Get('comment.list')
    async list(
        @SearchFilterDateGtLtDecorator('createdAt')
        createdAt: Record<string, any>,

        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
        }: CommentListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
            ...(createdAt || {}),
        };

        const comments = await this.commentService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });
        const totalData: number = await this.commentService.getTotal(find);
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data: comments,
        };
    }

    @Get(':id')
    findOne(@Param('id', new ValidateObjectId()) id: ObjectID) {
        return this.commentService.findOne(id);
    }

    @ResponsePaging('comment.list')
    @Get('comment.list/:id')
    async listByPost(
        @Param('id') blog: ObjectID,
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
        }: CommentListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
            blog,
        };

        const comments = await this.commentService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });
        const totalData: number = await this.commentService.getTotal(find);
        const totalPage: number = await this.paginationService.totalPage(
            totalData,
            perPage
        );

        return {
            totalData,
            totalPage,
            currentPage: page,
            perPage,
            availableSearch,
            availableSort,
            data: comments,
        };
    }

    @Patch(':id')
    update(
        @Param('id', new ValidateObjectId()) id: ObjectID,
        @Body() updateCommentDto: UpdateCommentDto
    ) {
        return this.commentService.update(id, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param('id', new ValidateObjectId()) id: ObjectID) {
        return this.commentService.remove(id);
    }
}
