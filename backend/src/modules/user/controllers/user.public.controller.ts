import {
    BadRequestException,
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../services/user.service';
import { UserSignUpDto } from '../dtos/user.sign-up.dto';
import { IResponse } from '~/common/response/response.interface';
import { AuthService } from '~/common/auth/services/auth.service';
import { MailService } from '~/common/mail/services/mail.service';
import { RoleDocument } from '~/modules/role/schemas/role.schema';
import { RoleService } from '~/modules/role/services/role.service';
import { IUserCheckExist, IUserDocument } from '../user.interface';
import { Response } from '~/common/response/decorators/response.decorator';
import { HelperHashService } from '~/common/helper/services/helper.hash.service';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '~/modules/role/constants/role.status-code.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';

@ApiTags('modules.public.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserPublicController {
    private saltLength;
    constructor(
        private readonly config: ConfigService,
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly roleService: RoleService,
        private readonly mailService: MailService,
        private readonly helperHashService: HelperHashService
    ) {
        this.saltLength = this.config.get('auth.saltLength');
    }

    @Response('user.signUp')
    @Post('/sign-up')
    async signUp(
        @Body()
        { email, mobileNumber, role, ...body }: UserSignUpDto
    ): Promise<IResponse> {
        const findRole: RoleDocument =
            await this.roleService.findOne<RoleDocument>({
                name: role,
            });

        if (!findRole) {
            throw new NotFoundException({
                statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
                message: 'role.error.notFound',
            });
        }

        if (findRole?.name === 'superadmin')
            throw new NotFoundException({
                statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
                message: 'You cannot create super admin',
            });

        const checkExist: IUserCheckExist = await this.userService.checkExist(
            email,
            mobileNumber
        );

        if (checkExist?.email && checkExist?.mobileNumber) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EXISTS_ERROR,
                message: 'user.error.exist',
            });
        } else if (checkExist?.email) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
                message: 'user.error.emailExist',
            });
        }

        try {
            const password = await this.authService.createPassword(
                body.password
            );

            const create = await this.userService.create({
                fullName: body.fullName,
                email,
                mobileNumber,
                role: findRole._id,
                password: password.passwordHash,
                passwordExpired: password.passwordExpired,
                salt: password.salt,
            });
            const resetToken: string = this.helperHashService.randomSalt(
                this.saltLength
            );

            const hash: string = this.helperHashService
                .bcrypt(create._id.toString(), resetToken)
                .replace(/\//g, 'slash');

            const link = `${process.env.CLIENT_URL}/confirmation?token=${hash}&id=${create._id}&type=${role}`;

            if (create) {
                this.mailService.sendUserConfirmation(
                    create.email,
                    create.fullName,
                    link
                );
            }

            const user: IUserDocument =
                await this.userService.findOneById<IUserDocument>(create._id, {
                    populate: {
                        role: true,
                        permission: true,
                    },
                });

            const payload: UserPayloadSerialization =
                await this.userService.payloadSerialization(user);
            const payloadAccessToken: Record<string, any> =
                await this.authService.createPayloadAccessToken(payload, false);
            const payloadRefreshToken: Record<string, any> =
                await this.authService.createPayloadRefreshToken(
                    payload._id,
                    false,
                    {
                        loginDate: payloadAccessToken.loginDate,
                    }
                );

            const accessToken: string =
                await this.authService.createAccessToken(payloadAccessToken);

            const refreshToken: string =
                await this.authService.createRefreshToken(
                    payloadRefreshToken,
                    false
                );

            return {
                accessToken,
                refreshToken,
            };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    @Response('auth.get')
    @Get(':id')
    async getUserInformation(@Param('id') uniqueName: string) {
        return await this.userService.getUserInformation(uniqueName);
    }

    @Response('auth.verification')
    @Get('/confirm/:token/:id')
    async verifyEmail(@Param('token') token: string, @Param('id') id: string) {
        return this.userService.verifyEmail(token, id);
    }

    @Response('user.sendConfirmation')
    @Post('/sendConfirmation')
    async sendEmail(@Body() { email, firstName }) {
        return await this.mailService.sendUserConfirmation(
            email,
            firstName,
            ''
        );
    }
}
