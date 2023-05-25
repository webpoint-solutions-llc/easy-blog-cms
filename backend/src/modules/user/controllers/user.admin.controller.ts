import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Put,
    Query,
    InternalServerErrorException,
    BadRequestException,
    Patch,
    NotFoundException,
    UploadedFile,
    Res,
    Param,
    PreconditionFailedException,
} from '@nestjs/common';

import {
    AuthAdminJwtGuard,
    AuthJwtGuard,
} from '~/common/auth/decorators/auth.jwt.decorator';

import {
    Response,
    ResponsePaging,
} from '~/common/response/decorators/response.decorator';
import {
    IResponse,
    IResponsePaging,
} from '~/common/response/response.interface';

import {
    UserDeleteGuard,
    UserGetGuard,
    UserUpdateActiveGuard,
    UserUpdateGuard,
    UserUpdateInactiveGuard,
} from '../decorators/user.admin.decorator';
import { ObjectID } from 'bson';
import { Types } from 'mongoose';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserListDto } from '../dtos/user.list.dto';
import { GetUser } from '../decorators/user.decorator';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserDeleteDto } from '../dtos/user.delete.dto';
import { UserImportDto } from '../dtos/user.import.dto';
import { UserUpdateDto } from '../dtos/user.update.dto';
import { UserRequestDto } from '../dtos/user.request.dto';
import { IFileExtract } from '~/common/file/file.interface';
import { UserInactiveDto } from '../dtos/user.inactive.dto';
import { IRoleDocument } from '~/modules/role/role.interface';
import { User } from '~/common/auth/decorators/auth.decorator';
import { ROLES } from '~/modules/role/constants/role.constant';
import { MailService } from '~/common/mail/services/mail.service';
import { AuthService } from '~/common/auth/services/auth.service';
import { IUserCheckExist, IUserDocument } from '../user.interface';
import { RoleService } from '~/modules/role/services/role.service';
import { FileSizeExcelPipe } from '~/common/file/pipes/file.size.pipe';
import { FileTypeExcelPipe } from '~/common/file/pipes/file.type.pipe';
import { UserRoleUpdateDto } from '../dtos/user.update-user-role.dto';
import { FileExtractPipe } from '~/common/file/pipes/file.extract.pipe';
import { FileRequiredPipe } from '~/common/file/pipes/file.required.pipe';
import { UploadFileSingle } from '~/common/file/decorators/file.decorator';
import { FileValidationPipe } from '~/common/file/pipes/file.validation.pipe';
import { UserGetSerialization } from '../serializations/user.get.serialization';
import { HelperFileService } from '~/common/helper/services/helper.file.service';
import { UserListSerialization } from '../serializations/user.list.serialization';
import { RequestParamGuard } from '~/common/request/decorators/request.decorator';
import { PaginationService } from '~/common/pagination/services/pagination.service';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { ENUM_AUTH_PERMISSIONS } from '~/common/auth/constants/auth.enum.permission.constant';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '~/modules/role/constants/role.status-code.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';

@ApiTags('modules.admin.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserAdminController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
        private readonly paginationService: PaginationService,
        private readonly helperFileService: HelperFileService,
        private readonly mailService: MailService
    ) {}

    @ResponsePaging('user.list', {
        classSerialization: UserListSerialization,
    })
    @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.USER_READ)
    @Get('/list')
    async list(
        @Query()
        {
            page,
            perPage,
            content,
            sort,
            search,
            availableSort,
            availableSearch,
            excludeWebPortalUser,
            lastLogin,
            fullName,
        }: UserListDto
    ): Promise<IResponsePaging> {
        const skip: number = await this.paginationService.skip(page, perPage);

        const role = await this.roleService.findOne<IRoleDocument>({
            name: content,
        });
        const roles = await this.roleService.findAll({
            $or: [
                {
                    name: 'company',
                },
                {
                    name: 'candidate',
                },
            ],
        });

        const roles_ids = roles.map((row) => row._id);

        const find: Record<string, any> = {
            isDeleted: false,
            ...search,
            ...lastLogin,
            ...fullName,
            ...(excludeWebPortalUser || content
                ? {
                      $and: [
                          excludeWebPortalUser
                              ? { role: { $nin: roles_ids } }
                              : {},
                          content && role?._id ? { role: role?._id } : {},
                      ],
                  }
                : {}),
        };

        let users: IUserDocument[] = await this.userService.findAll(find, {
            limit: perPage,
            skip: skip,
            sort,
        });

        // find user posts
        users = await Promise.all(
            users.map(async (row) => {
                row['totalBlogs'] = await this.userService.countBlogByUser(
                    row._id
                );

                return row;
            })
        );

        const totalData: number = await this.userService.getTotal(find);
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
            data: users,
        };
    }

    @Response('user.get', {
        classSerialization: UserGetSerialization,
    })
    @UserGetGuard()
    @RequestParamGuard(UserRequestDto)
    @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.USER_READ)
    @Get('get/:user')
    async get(@GetUser() user: IUserDocument): Promise<IResponse> {
        return user;
    }

    @Response('user.create')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_CREATE
    )
    @Post('/create')
    async create(
        @Body()
        body: UserCreateDto
    ): Promise<IResponse> {
        const checkExist: IUserCheckExist = await this.userService.checkExist(
            body.email,
            body.mobileNumber
        );

        if (checkExist.email && checkExist.mobileNumber) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EXISTS_ERROR,
                message: 'user.error.exist',
            });
        } else if (checkExist.email) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
                message: 'user.error.emailExist',
            });
        }
        // else if (checkExist.mobileNumber) {
        //     throw new BadRequestException({
        //         statusCode:
        //             ENUM_USER_STATUS_CODE_ERROR.USER_MOBILE_NUMBER_EXIST_ERROR,
        //         message: 'user.error.mobileNumberExist',
        //     });
        // }

        const role: IRoleDocument = await this.roleService.findOne({
            name: body.role,
        });
        if (!role) {
            throw new NotFoundException({
                statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
                message: 'role.error.notFound',
            });
        }

        try {
            const password = await this.authService.createPassword(
                body.password
            );

            const create = await this.userService.create({
                fullName: body.fullName,
                email: body.email,
                mobileNumber: body.mobileNumber,
                role: role._id,
                password: password.passwordHash,
                passwordExpired: password.passwordExpired,
                salt: password.salt,
            });

            // Mail: send notification mail to author and admin
            if ([ROLES.AUTHOR, ROLES.ADMIN].includes(role.name)) {
                this.mailService.sendMailToAdminAuthor(
                    body.email,
                    body.fullName,
                    body.password
                );
            }

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

    @Response('user.delete')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_DELETE
    )
    @Delete('/delete/:id')
    async delete(@Param() id: ObjectID): Promise<void> {
        const _id = new ObjectID(id);

        const user = await this.userService.findOneById<IUserDocument>(_id, {
            populate: { role: true },
        });

        if (!user) throw new NotFoundException('User not found');

        if (user.role.name === 'superadmin')
            throw new BadRequestException(
                'You cannot delete superadmin account'
            );

        await this.userService.updateOneById(_id, {
            isDeleted: true,
        });
        return;
    }

    @Response('user.delete')
    // @UserDeleteGuard()
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_DELETE
    )
    @Delete('/delete-with-password/:id')
    async deleteWithPassword(
        @User('_id') currentUserId: Types.ObjectId,
        @Param() id: ObjectID,
        @Body()
        body: UserDeleteDto
    ): Promise<void> {
        const _id = new ObjectID(id);
        const { validate } = await this.userService.validatePassword(
            currentUserId,
            body.password
        );

        const user = await this.userService.findOneById<IUserDocument>(_id, {
            populate: { role: true },
        });

        if (!user) throw new NotFoundException('User not found');

        if (!validate) throw new BadRequestException('Password incorrect');

        if (user.role.name === 'superadmin')
            throw new BadRequestException(
                'You cannot delete superadmin account'
            );

        await this.userService.updateOneById(_id, {
            isDeleted: true,
            reason: body.reason,
        });
        return;
    }

    @Response('user.update')
    // @UserUpdateGuard()
    @AuthJwtGuard()
    // @RequestParamGuard(UserRequestDto)
    // @AuthAdminJwtGuard(
    //     ENUM_AUTH_PERMISSIONS.USER_READ,
    //     ENUM_AUTH_PERMISSIONS.USER_UPDATE
    // )
    @Put('/update')
    async update(
        // @GetUser() user: IUserDocument,
        @User('_id') _id: ObjectID,
        @Body()
        body: UserUpdateDto
    ): Promise<IResponse> {
        try {
            return await this.userService.updateOneById(_id, body);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        // return {
        //     _id: _id,
        // };
    }

    @Response('user.update')
    // @UserUpdateGuard()
    @AuthJwtGuard()
    @Put('update/:id')
    async updateAUser(
        @Body()
        body: UserUpdateDto,
        @Param() id
    ): Promise<IResponse> {
        return await this.userService.updateOneById(new ObjectID(id), body);
    }

    @Response('user.update')
    // @UserUpdateGuard()
    @AuthJwtGuard()
    @Put('update.role/:id')
    async updateAUserRole(
        @Body()
        body: UserRoleUpdateDto,
        @Param() id
    ): Promise<IResponse> {
        const role = await this.roleService.findOne<IRoleDocument>({
            name: body.role,
        });

        if (!role)
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: 'Cannot find role',
            });

        const rolePayload = {
            role: role?._id,
        };

        return await this.userService.updateOneById(
            new ObjectID(id),
            rolePayload
        );
    }

    @Response('user.inactive')
    @AuthJwtGuard()
    @Patch('/update/self-inactive')
    async selfInactive(
        @User('_id') _id: ObjectID,
        @Body() body: UserInactiveDto
    ): Promise<void> {
        const { user, validate } = await this.userService.validatePassword(
            _id,
            body.password
        );

        if (!validate)
            throw new PreconditionFailedException('Password incorrect');

        await this.userService.inactive(_id, body);

        return;
    }

    @Response('user.inactive')
    @UserUpdateInactiveGuard()
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_UPDATE
    )
    @RequestParamGuard(UserRequestDto)
    @Patch('/update/:user/inactive')
    async inactive(
        @Param() _id: ObjectID,
        @Body() body: UserInactiveDto
    ): Promise<void> {
        try {
            const { user, validate } = await this.userService.validatePassword(
                _id,
                body.password
            );

            if (!validate) throw new BadRequestException('Password incorrect');

            await this.userService.inactive(user._id, body);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }

    @Response('user.active')
    @UserUpdateActiveGuard()
    @RequestParamGuard(UserRequestDto)
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_UPDATE
    )
    @Patch('/update/:user/active')
    async active(@GetUser() user: IUserDocument): Promise<void> {
        try {
            await this.userService.active(user._id);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }

    @Response('user.import')
    @UploadFileSingle('file')
    @AuthAdminJwtGuard(
        ENUM_AUTH_PERMISSIONS.USER_READ,
        ENUM_AUTH_PERMISSIONS.USER_CREATE,
        ENUM_AUTH_PERMISSIONS.USER_IMPORT
    )
    @Post('/import')
    async import(
        @UploadedFile(
            FileRequiredPipe,
            FileSizeExcelPipe,
            FileTypeExcelPipe,
            FileExtractPipe,
            new FileValidationPipe<UserImportDto>(UserImportDto)
        )
        file: IFileExtract<UserImportDto>
    ): Promise<IResponse> {
        return { file };
    }

    @AuthAdminJwtGuard(ENUM_AUTH_PERMISSIONS.ROLE_READ)
    @Response('user.get')
    @Get('user.export')
    async export(@Res() res) {
        const users = await this.userService.findAll();

        const formattedUsers = users.map((row: any) => {
            row['role'] = row?.role?.name;
            return row;
        });

        try {
            const headers = [
                'fullName',
                'mobileNumber',
                'email',
                'isEmailVerified',
                'createdAt',
            ];

            const path = await this.helperFileService.writeSimpleExcel(
                formattedUsers,
                headers
            );

            return res.download(path);
        } catch (err) {
            console.error(err);
        }

        return 'No data found';
    }
}
