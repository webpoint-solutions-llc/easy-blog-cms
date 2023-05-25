import SizeOf from 'image-size';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UploadedFiles,
    Query,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { ObjectID } from 'bson';
import { ApiTags } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { IAwsS3 } from '~/common/aws/aws.interface';
import { MediaListDto } from './dto/media.list.dto';
import { IFiles } from '~/common/file/file.interface';
import { UpdateMediaDto } from './dto/update-media.dto';
import { UserService } from '../user/services/user.service';
import { User } from '~/common/auth/decorators/auth.decorator';
import { CreateMediaFromBodyDto } from './dto/create-media.dto';
import { ValidateObjectId } from '~/common/helper/helper.function';
import { AwsS3Service } from '~/common/aws/services/aws.s3.service';
import { IResponsePaging } from '~/common/response/response.interface';
import { FileRequiredPipe } from '~/common/file/pipes/file.required.pipe';
import {
    Response,
    ResponsePaging,
} from '~/common/response/decorators/response.decorator';
import { AuthJwtGuard } from '~/common/auth/decorators/auth.jwt.decorator';
import { UploadFileMultiple } from '~/common/file/decorators/file.decorator';
import { PaginationService } from '~/common/pagination/services/pagination.service';

@ApiTags('modules.media')
@Controller('media')
export class MediaController {
    constructor(
        private readonly mediaService: MediaService,
        private readonly awsService: AwsS3Service,
        private readonly userService: UserService,
        private readonly paginationService: PaginationService
    ) {}
    @Response('media.create')
    @AuthJwtGuard()
    @UploadFileMultiple('file')
    @Post()
    async create(
        @User('fullName') fullName: string,
        @Body() createMedia: CreateMediaFromBodyDto,
        @UploadedFiles(FileRequiredPipe)
        files: IFiles
    ) {
        return await Promise.all(
            files.map(async (file) => {
                const filename: string = file.originalname;

                const content: Buffer = file.buffer;

                const mime: string = filename
                    .substring(filename.lastIndexOf('.') + 1, filename.length)
                    .toUpperCase();

                const path = await this.userService.createRandomFilename();

                try {
                    const aws: IAwsS3 = await this.awsService.putItemInBucket(
                        `${path.filename}.${mime}`,
                        content,
                        {
                            path: `${path.path}`,
                            originalFileName: filename,
                        }
                    );

                    if (!aws) {
                        throw new HttpException(
                            'Could not upload media to aws',
                            HttpStatus.INTERNAL_SERVER_ERROR
                        );
                    }

                    return await this.mediaService.create({
                        file: {
                            ...aws,
                            dimension: {
                                height: SizeOf(file.buffer).height,
                                width: SizeOf(file.buffer).width,
                            },
                            size: file.size,
                            description: createMedia.description,
                            alt: createMedia.alt,
                            title: createMedia.title,
                            uploadedBy: fullName,
                        },
                    });
                } catch (err: any) {
                    console.log(err);
                }
            })
        );
    }

    @Get()
    findAll() {
        return this.mediaService.findAll();
    }

    @ResponsePaging('media.list')
    @Get('media.list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            content,
            availableSearch,
        }: MediaListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        let searchParams = null;

        switch (content) {
            case 'images':
                searchParams = {
                    $in: ['png', 'PNG', 'JPG', 'jpg', 'JPEG', 'jpeg'],
                };
                break;
            case 'videos':
                searchParams = { $in: ['MP4', 'mov', 'mp4'] };
                break;
            case 'gif':
                searchParams = { $in: ['gif'] };
                break;
            default:
                searchParams = null;
                break;
        }

        const find: Record<string, any> = {
            ...search,
            ...(content && searchParams ? { 'file.mime': searchParams } : {}),
        };

        const data = await this.mediaService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });
        const totalData: number = await this.mediaService.getTotal(find);
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
            data,
        };
    }

    @Get(':id')
    @Response('media.get')
    findOne(@Param('id', new ValidateObjectId()) id: ObjectID) {
        return this.mediaService.findOne(id);
    }

    @Patch(':id')
    @Response('media.update')
    update(
        @Param('id', new ValidateObjectId()) id: ObjectID,
        @Body() updateMediaDto: UpdateMediaDto
    ) {
        return this.mediaService.update(id, updateMediaDto);
    }

    @Delete(':id')
    @Response('media.delete')
    remove(@Param('id', new ValidateObjectId()) id: ObjectID) {
        return this.mediaService.remove(id);
    }
}
