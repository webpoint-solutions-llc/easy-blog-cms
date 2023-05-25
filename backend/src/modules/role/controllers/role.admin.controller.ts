import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Patch,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import {
    RoleDeleteGuard,
    RoleGetGuard,
    RoleUpdateActiveGuard,
    RoleUpdateGuard,
    RoleUpdateInactiveGuard,
} from '../decorators/role.admin.decorator';
import {
    IResponse,
    IResponsePaging,
} from '~/common/response/response.interface';
import {
    Response,
    ResponsePaging,
} from '~/common/response/decorators/response.decorator';
import { ApiTags } from '@nestjs/swagger';
import { IRoleDocument } from '../role.interface';
import { RoleListDto } from '../dtos/role.list.dto';
import { RoleDocument } from '../schemas/role.schema';
import { GetRole } from '../decorators/role.decorator';
import { RoleService } from '../services/role.service';
import { RoleCreateDto } from '../dtos/role.create.dto';
import { RoleUpdateDto } from '../dtos/role.update.dto';
import { RoleRequestDto } from '../dtos/role.request.dto';
import { AuthAdminJwtGuard } from '~/common/auth/decorators/auth.jwt.decorator';
import { RoleGetSerialization } from '../serializations/role.get.serialization';
import { RequestParamGuard } from '~/common/request/decorators/request.decorator';
import { RoleListSerialization } from '../serializations/role.list.serialization';
import { PaginationService } from '~/common/pagination/services/pagination.service';
import { PermissionDocument } from '~/modules/permission/schemas/permission.schema';
import { PermissionService } from '~/modules/permission/services/permission.service';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '../constants/role.status-code.constant';
import { ENUM_AUTH_PERMISSIONS } from '~/common/auth/constants/auth.enum.permission.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';
import { ENUM_PERMISSION_STATUS_CODE_ERROR } from '~/modules/permission/constants/permission.status-code.constant';

@ApiTags('modules.role')
@Controller({
    version: '1',
    path: '/role',
})
export class RoleAdminController {
    constructor(
        private readonly paginationService: PaginationService,
        private readonly roleService: RoleService,
        private readonly permissionService: PermissionService
    ) {}

    @ResponsePaging('role.list', {
        classSerialization: RoleListSerialization,
    })
    // @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.ROLE_READ)
    @Get('/list')
    async list(
        @Query()
        {
            page,
            perPage,
            sort,
            search,
            availableSort,
            availableSearch,
        }: RoleListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);
        const find: Record<string, any> = {
            ...search,
        };

        const roles: RoleDocument[] = await this.roleService.findAll(find, {
            skip: skip,
            limit: perPage,
            sort,
        });

        const totalData: number = await this.roleService.getTotal({});
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
            data: roles,
        };
    }

    @Response('role.get', {
        classSerialization: RoleGetSerialization,
    })
    @RoleGetGuard()
    @RequestParamGuard(RoleRequestDto)
    @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.ROLE_READ)
    @Get('get/:role')
    async get(@GetRole() role: IRoleDocument): Promise<IResponse> {
        return role;
    }

    @Response('role.create')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.ROLE_READ,
        ENUM_AUTH_PERMISSIONS.ROLE_CREATE
    )
    @Post('/create')
    async create(
        @Body()
        { name, permissions, accessFor }: RoleCreateDto
    ): Promise<IResponse> {
        const exist: boolean = await this.roleService.exists(name);
        if (exist) {
            throw new BadRequestException({
                statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_EXIST_ERROR,
                message: 'role.error.exist',
            });
        }

        for (const permission of permissions) {
            const checkPermission: PermissionDocument =
                await this.permissionService.findOneById(permission);

            if (!checkPermission) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_PERMISSION_STATUS_CODE_ERROR.PERMISSION_NOT_FOUND_ERROR,
                    message: 'permission.error.notFound',
                });
            }
        }

        try {
            const create = await this.roleService.create({
                name,
                permissions,
                accessFor,
            });

            return {
                _id: create._id,
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    @Response('role.update')
    @RoleUpdateGuard()
    @RequestParamGuard(RoleRequestDto)
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.ROLE_READ,
        ENUM_AUTH_PERMISSIONS.ROLE_UPDATE
    )
    @Put('/update/:role')
    async update(
        @GetRole() role: RoleDocument,
        @Body()
        { name, permissions, accessFor }: RoleUpdateDto
    ): Promise<IResponse> {
        const check: boolean = await this.roleService.exists(name, role._id);
        if (check) {
            throw new BadRequestException({
                statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_EXIST_ERROR,
                message: 'role.error.exist',
            });
        }

        for (const permission of permissions) {
            const checkPermission: PermissionDocument =
                await this.permissionService.findOneById(permission);

            if (!checkPermission) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_PERMISSION_STATUS_CODE_ERROR.PERMISSION_NOT_FOUND_ERROR,
                    message: 'permission.error.notFound',
                });
            }
        }

        try {
            await this.roleService.update(role._id, {
                name,
                permissions,
                accessFor,
            });
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return {
            _id: role._id,
        };
    }

    @Response('role.delete')
    @RoleDeleteGuard()
    @RequestParamGuard(RoleRequestDto)
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.ROLE_READ,
        ENUM_AUTH_PERMISSIONS.ROLE_DELETE
    )
    @Delete('/delete/:role')
    async delete(@GetRole() role: IRoleDocument): Promise<void> {
        try {
            await this.roleService.deleteOneById(role._id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
        return;
    }

    @Response('role.inactive')
    @RoleUpdateInactiveGuard()
    @RequestParamGuard(RoleRequestDto)
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.ROLE_READ,
        ENUM_AUTH_PERMISSIONS.ROLE_UPDATE
    )
    @Patch('/update/:role/inactive')
    async inactive(@GetRole() role: IRoleDocument): Promise<void> {
        try {
            await this.roleService.inactive(role._id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }

    @Response('role.active')
    @RoleUpdateActiveGuard()
    @RequestParamGuard(RoleRequestDto)
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.ROLE_READ,
        ENUM_AUTH_PERMISSIONS.ROLE_UPDATE
    )
    @Patch('/update/:role/active')
    async active(@GetRole() role: IRoleDocument): Promise<void> {
        try {
            await this.roleService.active(role._id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }
}
