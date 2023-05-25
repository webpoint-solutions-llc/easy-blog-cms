import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    BadRequestException,
    NotFoundException,
    Query,
    HttpStatus,
} from '@nestjs/common';

import { GoogleJwtPayload } from '../auth.interface';
import { AuthService } from '../services/auth.service';
import { GoogleService } from '../services/google.service';
import { SocialLoginCodeDto } from '../dtos/social.code.dto';
import { ROLES } from '~/modules/role/constants/role.constant';
import { LoginAs } from '~/modules/user/constants/user.constant';
import { RoleDocument } from '~/modules/role/schemas/role.schema';
import { MailService } from '~/common/mail/services/mail.service';
import { UserService } from '~/modules/user/services/user.service';
import { RoleService } from '~/modules/role/services/role.service';
import { IUserDocument, IUserCreate } from '~/modules/user/user.interface';
import { CompanyMailService } from '~/common/mail/services/company.mail.service';
import { CandidateMailService } from '~/common/mail/services/candidate.mail.service';
import { HelperEncryptionService } from '~/common/helper/services/helper.encryption.service';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '~/modules/role/constants/role.status-code.constant';
import { ENUM_USER_STATUS_CODE_ERROR } from '~/modules/user/constants/user.status-code.constant';
import { UserPayloadSerialization } from '~/modules/user/serializations/user.payload.serialization';
@Controller({
    version: '1',
    path: 'auth',
})
export class SocialSignUpController {
    constructor(
        private readonly google: GoogleService,
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly roleService: RoleService,
        private readonly mailService: MailService,
        private readonly jwtService: HelperEncryptionService,
        private readonly companyMailService: CompanyMailService,
        private readonly candidateMailService: CandidateMailService
    ) {}

    @Get('google')
    async getGoogleLoginUrl(@Query() query): Promise<any> {
        return this.google.login(query.redirectUrl);
    }

    @Post('google')
    async signUpWithGoogle(@Body() body: SocialLoginCodeDto): Promise<any> {
        const rememberMe = false;
        try {
            const token = await this.google.getTokenFromGoogle(body.code);

            const tokenInfo = this.jwtService.jwtDecrypt(
                token
            ) as GoogleJwtPayload;

            const userData = {
                fullName: tokenInfo.given_name + ' ' + tokenInfo.family_name,
                email: tokenInfo.email,
            };

            const checkExist = await this.userService.checkExist(
                userData.email
            );

            let user: IUserDocument =
                await this.userService.findOne<IUserDocument>(
                    {
                        email: tokenInfo.email,
                        googleSignIn: true,
                    },
                    {
                        populate: {
                            role: true,
                            permission: true,
                        },
                    }
                );

            let payload: UserPayloadSerialization;

            // login user
            if (user) {
                // validate for specific role login
                if (user.role.name != body.role)
                    throw new BadRequestException({
                        statusCode:
                            ENUM_USER_STATUS_CODE_ERROR.USER_INVALID_LOGIN,
                        message: 'user.error.invalidLogin',
                    });

                payload = await this.userService.payloadSerialization(user);
            }
            //  create user if not created
            else {
                if (checkExist?.email) {
                    throw new BadRequestException({
                        statusCode:
                            ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
                        message: 'user.error.emailExist',
                    });
                }

                const role: RoleDocument =
                    await this.roleService.findOne<RoleDocument>({
                        name: body.role,
                    });
                if (!role) {
                    throw new NotFoundException({
                        statusCode:
                            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
                        message: 'role.error.notFound',
                    });
                }

                if (role?.name === 'superadmin')
                    throw new NotFoundException({
                        statusCode:
                            ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
                        message: 'You cannot create super admin',
                    });

                const newUser: any = await this.userService.createWithGoogle(
                    { ...userData },
                    role._id
                );

                const user_payload: IUserDocument =
                    await this.userService.findOne<IUserDocument>(
                        {
                            email: newUser.email,
                            googleSignIn: true,
                        },
                        {
                            populate: {
                                role: true,
                                permission: true,
                            },
                        }
                    );

                user = user_payload;
                payload = await this.userService.payloadSerialization(
                    user_payload
                );

                // Mail to user
                if (body.role === ROLES.COMPANY)
                    this.companyMailService.sendWelcomeMail(
                        userData.email,
                        userData.fullName
                    );
                else
                    this.candidateMailService.sendCandidateWelcomeMail(
                        userData.email
                    );
            }

            const payloadAccessToken: Record<string, any> =
                await this.authService.createPayloadAccessToken(
                    payload,
                    rememberMe
                );
            const payloadRefreshToken: Record<string, any> =
                await this.authService.createPayloadRefreshToken(
                    payload._id,
                    rememberMe,
                    {
                        loginDate: payloadAccessToken.loginDate,
                    }
                );

            const accessToken: string =
                await this.authService.createAccessToken(payloadAccessToken);

            const refreshToken: string =
                await this.authService.createRefreshToken(
                    payloadRefreshToken,
                    rememberMe
                );

            const userDetail =
                await this.userService.getCompanyOrCandiateDetail(user._id);

            return {
                user,
                userDetail,
                hasUserDetail: userDetail ? true : false,
                accessToken,
                refreshToken,
            };
        } catch (err: any) {
            console.error(err);

            throw new InternalServerErrorException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: err.message
                    ? err.message
                    : 'http.serverError.internalServerError',
            });
        }
    }
}
