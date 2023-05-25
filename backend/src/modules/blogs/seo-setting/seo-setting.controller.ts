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
import { SeoSettingService } from './seo-setting.service';
import { SeoSettingListDto } from './dto/list.seo-setting.dto';
import { CreateSeoSettingDto } from './dto/create-seo-setting.dto';
import { UpdateSeoSettingDto } from './dto/update-seo-setting.dto';
import { IResponsePaging } from '~/common/response/response.interface';
import { AuthAdminJwtGuard } from '~/common/auth/decorators/auth.jwt.decorator';
import { ResponsePaging } from '~/common/response/decorators/response.decorator';
import { PaginationService } from '~/common/pagination/services/pagination.service';
import { ENUM_AUTH_PERMISSIONS } from '~/common/auth/constants/auth.enum.permission.constant';

@Controller('seo-setting')
export class SeoSettingController {
    constructor(
        private readonly seoSettingService: SeoSettingService,
        private readonly paginationService: PaginationService
    ) {}

    @Post()
    create(@Body() createSeoSettingDto: CreateSeoSettingDto) {
        return this.seoSettingService.create(createSeoSettingDto);
    }

    @Get()
    findAll() {
        return this.seoSettingService.findAll();
    }

    @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.ROLE_READ)
    @ResponsePaging('seo-setting.list')
    @Get('seo-setting.list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
        }: SeoSettingListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
        };
        const blogs = await this.seoSettingService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });
        const totalData: number = await this.seoSettingService.getTotal(find);
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
            data: blogs,
        };
    }

    @Get(':id')
    findOne(@Param('id') id: ObjectID) {
        return this.seoSettingService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: ObjectID,
        @Body() updateSeoSettingDto: UpdateSeoSettingDto
    ) {
        return this.seoSettingService.update(id, updateSeoSettingDto);
    }

    @Delete(':id')
    remove(@Param('id') id: ObjectID) {
        return this.seoSettingService.remove(id);
    }
}
