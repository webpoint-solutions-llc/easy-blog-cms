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
import { SeoTemplateService } from './seo-template.service';
import { SeoTemplateListDto } from './dto/list.seo-template.dto';
import { CreateSeoTemplateDto } from './dto/create-seo-template.dto';
import { UpdateSeoTemplateDto } from './dto/update-seo-template.dto';
import { IResponsePaging } from '~/common/response/response.interface';
import { AuthAdminJwtGuard } from '~/common/auth/decorators/auth.jwt.decorator';
import {
    Response,
    ResponsePaging,
} from '~/common/response/decorators/response.decorator';
import { ValidateObjectId } from '~/common/helper/helper.function';
import { PaginationService } from '~/common/pagination/services/pagination.service';
import { ENUM_AUTH_PERMISSIONS } from '~/common/auth/constants/auth.enum.permission.constant';

@Controller('seo-template')
export class SeoTemplateController {
    constructor(
        private readonly seoTemplateService: SeoTemplateService,
        private readonly paginationService: PaginationService
    ) {}

    @Response('seoTemplate.get')
    @Post()
    create(@Body() createSeoTemplateDto: CreateSeoTemplateDto) {
        return this.seoTemplateService.create(createSeoTemplateDto);
    }

    @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.ROLE_READ)
    @ResponsePaging('seoTemplate.list')
    @Get('seo-template.list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
            pageType,
        }: SeoTemplateListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
            ...pageType,
        };

        const seoTemplates = await this.seoTemplateService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });
        const totalData: number = await this.seoTemplateService.getTotal(find);
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
            data: seoTemplates,
        };
    }

    @Get(':id')
    @Response('seoTemplate.get')
    findOne(@Param('id', new ValidateObjectId()) id: ObjectID) {
        return this.seoTemplateService.findOne(id);
    }

    @Patch(':id')
    @Response('seoTemplate.update')
    update(
        @Param('id', new ValidateObjectId()) id: ObjectID,
        @Body() updateSeoTemplateDto: UpdateSeoTemplateDto
    ) {
        return this.seoTemplateService.update(id, updateSeoTemplateDto);
    }

    @Response('seoTemplate.update')
    @Delete(':id')
    remove(@Param('id', new ValidateObjectId()) id: ObjectID) {
        return this.seoTemplateService.remove(id);
    }
}
