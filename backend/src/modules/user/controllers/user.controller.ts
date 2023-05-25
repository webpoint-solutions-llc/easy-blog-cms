import {
    ENUM_USER_STATUS_CODE_ERROR,
    ENUM_USER_STATUS_CODE_SUCCESS,
} from '../constants/user.status-code.constant';
import {
    AuthJwtGuard,
    AuthRefreshJwtGuard,
} from '~/common/auth/decorators/auth.jwt.decorator';
import {
    BadRequestException,
    Body,
    Controller,
    ForbiddenException,
    Get,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    Patch,
    Post,
    UploadedFile,
    Req,
    UseGuards,
    Param,
    HttpException,
    Query,
} from '@nestjs/common';
import { ObjectID } from 'bson';
import { ApiTags } from '@nestjs/swagger';
import { HttpService } from '@nestjs/axios';
import { Client } from '@hubspot/api-client';
import { AuthGuard } from '@nestjs/passport';
import formurlencoded from 'form-urlencoded';
import { ConfigService } from '@nestjs/config';
import { IUserDocument } from '../user.interface';
import { IAwsS3 } from '~/common/aws/aws.interface';
import { IFile } from '~/common/file/file.interface';
import {
    ALLOW_ADMIN_PORTAL_ROLES,
    ALLOW_WEB_PORTAL_ROLES,
    LoginAs,
} from '../constants/user.constant';
import { UserLoginDto } from '../dtos/user.login.dto';
import { UserDocument } from '../schemas/user.schema';
import { GetUser } from '../decorators/user.decorator';
import { UserService } from '../services/user.service';
import { MailService } from '~/common/mail/services/mail.service';
import { IResponse } from '~/common/response/response.interface';
import { AuthService } from '~/common/auth/services/auth.service';
import { RoleDocument } from '~/modules/role/schemas/role.schema';
import { RoleService } from '~/modules/role/services/role.service';
import { AwsS3Service } from '~/common/aws/services/aws.s3.service';
import { Logger } from '~/common/logger/decorators/logger.decorator';
import { Token, User } from '~/common/auth/decorators/auth.decorator';
import { FileSizeImagePipe } from '~/common/file/pipes/file.size.pipe';
import { FileTypeImagePipe } from '~/common/file/pipes/file.type.pipe';
import { UserProfileGuard } from '../decorators/user.public.decorator';
import { UserProfileUploadDto } from '../dtos/user.profile.upload.dto';
import { ENUM_PORTAL } from '~/common/auth/constants/auth.enum.constant';
import { UserChangePasswordDto } from '../dtos/user.change-password.dto';
import { FileRequiredPipe } from '~/common/file/pipes/file.required.pipe';
import { UploadFileSingle } from '~/common/file/decorators/file.decorator';
import { Response } from '~/common/response/decorators/response.decorator';
import { HelperHashService } from '~/common/helper/services/helper.hash.service';
import { ENUM_LOGGER_ACTION } from '~/common/logger/constants/logger.enum.constant';
import { UserLoginSerialization } from '../serializations/user.login.serialization';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { UserProfileSerialization } from '../serializations/user.profile.serialization';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '~/modules/role/constants/role.status-code.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';
@ApiTags('modules.user')
@Controller({
    version: '1',
    path: '/user',
})
export class UserController {
    private clientId: string;
    private clientSecret: string;
    private redirectUrl: string;
    private saltLength: number;
    private hubspotClient;

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly awsService: AwsS3Service,
        private readonly roleService: RoleService,
        private readonly mailService: MailService,
        private readonly helperHashService: HelperHashService,
        private readonly httpService: HttpService,
        private readonly config: ConfigService
    ) {
        this.clientId = this.config.get('auth.linkedin.clientID');
        this.clientSecret = this.config.get('auth.linkedin.clientSecret');
        this.redirectUrl = this.config.get('auth.linkedin.callbackURL');
        this.saltLength = this.config.get('auth.saltLength');
        this.hubspotClient = new Client({
            accessToken: process.env.HUBSPOT_ACCESS_TOKEN,
        });
    }

    @Response('user.profile', {
        classSerialization: UserProfileSerialization,
    })
    @UserProfileGuard()
    @AuthJwtGuard()
    @Get('/profile')
    async profile(@GetUser() user: IUserDocument): Promise<IResponse> {
        return user;
    }

    @Response('user.upload')
    @UserProfileGuard()
    @AuthJwtGuard()
    @UploadFileSingle('file')
    @HttpCode(HttpStatus.OK)
    @Post('/profile/upload')
    async upload(
        @GetUser() user: IUserDocument,
        @UploadedFile(FileRequiredPipe, FileSizeImagePipe, FileTypeImagePipe)
        file: IFile
    ): Promise<void> {
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
                    path: `${path.path}/${user._id}`,
                    originalFileName: filename,
                }
            );

            await this.userService.updatePhoto(user._id, aws);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }

    @Response('user.changePassword')
    @AuthJwtGuard()
    @Patch('/change-password')
    async changePassword(
        @Body() body: UserChangePasswordDto,
        @User('_id') _id: string
    ): Promise<void> {
        const user: UserDocument = await this.userService.findOneById(_id);
        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        const matchPassword: boolean = await this.authService.validateUser(
            body.oldPassword,
            user.password
        );
        if (!matchPassword) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
                message: 'user.error.passwordNotMatch',
            });
        }

        const newMatchPassword: boolean = await this.authService.validateUser(
            body.newPassword,
            user.password
        );
        if (newMatchPassword) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NEW_MUST_DIFFERENCE_ERROR,
                message: 'user.error.newPasswordMustDifference',
            });
        }

        try {
            const password = await this.authService.createPassword(
                body.newPassword
            );

            await this.userService.updatePassword(user._id, password);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }

    //send request to reset password
    @Response('user.forgetPasswordRequest')
    @Patch('/forgetPasswordRequest')
    async requestForgetPassword(@Body() body) {
        const user: IUserDocument =
            await this.userService.findOne<IUserDocument>(
                {
                    email: body.email,
                },
                {}
            );
        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        const resetToken: string = this.helperHashService.randomSalt(
            this.saltLength
        );

        const hash: string = this.helperHashService
            .bcrypt(user._id.toString(), resetToken)
            .replace(/\//g, 'slash');

        await this.userService.updateOneById(user._id, {
            token: {
                token: hash,
                createdAt: new Date(),
            },
        });

        const link = `${process.env.CLIENT_URL}/forgot-password/new-password/passwordReset?token=${hash}&id=${user._id}`;

        return await this.mailService.sendResetPasswordEmail(
            user.email,
            link,
            user.fullName
        );
    }

    @Response('user.active')
    @Get('/reset/:token')
    async checkToken(@Param('token') token: string) {
        // check token token
        const isTokenUsed = await this.userService.findPasswordToken(token);
        if (isTokenUsed)
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
                message: 'user.error.invalidToken',
            });
    }

    //reset password
    @Response('user.changePassword')
    @Patch('/reset/:token/:id')
    async resetPassword(
        @Body('password') password: string,
        @Param('id') id: string,
        @Param('token') token: string
    ) {
        // check token token
        const isTokenUsed = await this.userService.findPasswordToken(token);
        if (isTokenUsed)
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
                message: 'user.error.invalidToken',
            });

        const user: UserDocument = await this.userService.findOneById(id);
        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        const isValid: boolean = await this.helperHashService.bcryptCompare(
            id,
            token.replace(/slash/g, '/')
        );

        if (!isValid) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.verificationTimeExceed',
            });
        }

        const timeDifference: number = this.userService.getTimeDiff(
            new Date(user.token.createdAt).getTime(),
            new Date().getTime()
        );

        if (parseInt(process.env.RESET_PASSWORD_EXPIRE_TIME) < timeDifference) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_VERIFICATION_TIME_EXCEED,
                message: 'user.error.verificationTimeExceed',
            });
        }

        try {
            const newPassword = await this.authService.createPassword(password);

            await this.userService.updatePassword(user._id, newPassword);

            // store password reset token
            await this.userService.createPasswordToken(token);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }

        return;
    }

    @Response('user.resendVerification')
    @Post('/resendVerification')
    async resendVerificationEmail(@Body() body) {
        const user: IUserDocument =
            await this.userService.findOne<IUserDocument>(
                {
                    email: body.email,
                },
                {}
            );

        if (user && user.isEmailVerified == false) {
            const resetToken: string = this.helperHashService.randomSalt(
                this.saltLength
            );

            const hash: string = this.helperHashService
                .bcrypt(user._id.toString(), resetToken)
                .replace(/\//g, 'slash');

            const link = `${process.env.CLIENT_URL}/confirmation?token=${hash}&id=${user._id}&type=${user?.role?.name}`;

            return await this.mailService.sendUserConfirmation(
                user.email,
                user.fullName,
                link
            );
        } else {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }
    }

    @Response('user.login')
    @Logger(ENUM_LOGGER_ACTION.LOGIN, { tags: ['login', 'withEmail'] })
    @HttpCode(HttpStatus.OK)
    @Post('/login')
    async login(@Body() body: UserLoginDto): Promise<IResponse> {
        const rememberMe: boolean = body.rememberMe ? true : false;
        const user: IUserDocument =
            await this.userService.findOne<IUserDocument>(
                {
                    email: body.email,
                },
                {
                    populate: {
                        role: true,
                        permission: true,
                    },
                }
            );

        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        }

        // uncomment to enable email verification
        // if (user.isEmailVerified == false) {
        //     throw new NotFoundException({
        //         statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_ACTIVE_ERROR,
        //         message: 'user.error.inactive',
        //     });
        // }

        // get user profile / company detail if available
        const userDetail = await this.userService.getCompanyOrCandiateDetail(
            user._id
        );

        const allowAdminPortal = body?.portal === user.role.portal;

        if (user.role.name != body.role && !allowAdminPortal) {
            throw new BadRequestException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_INVALID_LOGIN,
                message: 'user.error.invalidLogin',
            });
        }
        const validate: boolean = await this.authService.validateUser(
            body.password,
            user.password
        );

        if (!validate) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_NOT_MATCH_ERROR,
                message: 'user.error.passwordNotMatch',
            });
        } else if (!user.isActive) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_INACTIVE_ERROR,
                message: 'user.error.inactive',
            });
        } else if (!user.role.isActive) {
            throw new ForbiddenException({
                statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_IS_INACTIVE_ERROR,
                message: 'role.error.inactive',
            });
        }

        const payload: UserPayloadSerialization =
            await this.userService.payloadSerialization(user);
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

        const accessToken: string = await this.authService.createAccessToken(
            payloadAccessToken
        );

        const refreshToken: string = await this.authService.createRefreshToken(
            payloadRefreshToken,
            rememberMe
        );

        const checkPasswordExpired: boolean =
            await this.authService.checkPasswordExpired(user.passwordExpired);

        // if (checkPasswordExpired) {
        //     return {
        //         metadata: {
        //             statusCode:
        //                 ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_EXPIRED_ERROR,
        //             message: 'user.error.passwordExpired',
        //         },
        //         accessToken,
        //         refreshToken,
        //     };
        // }

        await this.userService.updateOneById(user._id, {
            lastLogin: new Date(),
        });
        return {
            metadata: {
                statusCode: ENUM_USER_STATUS_CODE_SUCCESS.USER_LOGIN_SUCCESS,
            },
            role: user.role.name,
            userDetail,
            accessToken,
            hasUserDetail: userDetail ? true : false,
            refreshToken,
        };
    }

    // Login with google
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        return 'google login';
    }

    @Response('user.login')
    @Get('redirect')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        const rememberMe = false;

        const user: IUserDocument =
            await this.userService.findOne<IUserDocument>({
                email: req.user.email,
                googleSignIn: true,
            });

        if (user) {
            const payload: UserPayloadSerialization =
                await this.userService.payloadSerialization(user);
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

            return {
                user,
                accessToken,
                refreshToken,
            };
        } else {
            const role: RoleDocument =
                await this.roleService.findOne<RoleDocument>({
                    name: 'user',
                });
            if (!role) {
                throw new NotFoundException({
                    statusCode:
                        ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
                    message: 'role.error.notFound',
                });
            }
            const userData = await this.userService.createWithGoogle(
                req.user,
                role._id
            );
            return {
                ...userData,
                acessToken: req.user.accessToken,
            };
        }
    }

    //login with linkedin
    @Get('auth/linkedin')
    // @UseGuards(AuthGuard('linkedin'))
    loginWithLinkedin(@Query() query) {
        const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${query.redirectUrl}&scope=r_liteprofile%20r_emailaddress`;

        return { url };
    }

    @Response('user.login')
    @Post('auth/linkedin')
    async linkedinCallback(@Req() req, @Body() body) {
        const data = {
            grant_type: 'authorization_code',
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code: body.code,
            redirect_uri: body.redirectUrl,
        };
        const rememberMe = false;

        try {
            const token = await this.httpService
                .post(
                    this.config.get('auth.linkedin.tokenURL'),
                    formurlencoded(data),
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    }
                )
                .toPromise();

            const userInfo = await this.httpService
                .get(this.config.get('auth.linkedin.userInfoURL'), {
                    headers: {
                        Authorization: 'Bearer ' + token.data.access_token,
                    },
                })
                .toPromise();

            const userEmail = await this.httpService
                .get(this.config.get('auth.linkedin.userEmailURL'), {
                    headers: {
                        Authorization: 'Bearer ' + token.data.access_token,
                    },
                })
                .toPromise();

            const userData = {
                firstName: userInfo.data.localizedFirstName,
                lastName: userInfo.data.localizedLastName,
                email: userEmail.data['elements'][0]['handle~']['emailAddress'],
            };

            //hubspot
            const contactObj = {
                properties: {
                    firstname: userData.firstName,
                    email: userData.email,
                },
            };

            try {
                this.mailService.sendEmployeeConfirmation(
                    userData.email,
                    userData.firstName
                );

                const createContactResponse =
                    await this.hubspotClient.crm.contacts.basicApi.create(
                        contactObj
                    );
                return createContactResponse;
            } catch (err) {
                throw new BadRequestException(err?.body?.message);
            }

            // const checkExist = await this.userService.checkExist(
            //     userData.email
            // );

            // const user: IUserDocument =
            //     await this.userService.findOne<IUserDocument>(
            //         {
            //             email: userData.email,
            //             linkedinSignIn: true,
            //         },
            //         {
            //             populate: {
            //                 role: true,
            //                 permission: true,
            //             },
            //         }
            //     );

            // let payload: UserPayloadSerialization;
            // if (user) {
            //     payload = await this.userService.payloadSerialization(user);
            // } else {
            //     if (checkExist?.email) {
            //         throw new BadRequestException({
            //             statusCode:
            //                 ENUM_USER_STATUS_CODE_ERROR.USER_EMAIL_EXIST_ERROR,
            //             message: 'user.error.emailExist',
            //         });
            //     }
            //     const role: RoleDocument =
            //         await this.roleService.findOne<RoleDocument>({
            //             name: 'user',
            //         });
            //     if (!role) {
            //         throw new NotFoundException({
            //             statusCode:
            //                 ENUM_ROLE_STATUS_CODE_ERROR.ROLE_NOT_FOUND_ERROR,
            //             message: 'role.error.notFound',
            //         });
            //     }
            //     const createdUser: any =
            //         await this.userService.createWithLinked(
            //             { ...userData },
            //             role._id
            //         );

            //     const user: IUserDocument =
            //         await this.userService.findOneById<IUserDocument>(
            //             createdUser._id,
            //             {
            //                 populate: {
            //                     role: true,
            //                     permission: true,
            //                 },
            //             }
            //         );

            //     payload = await this.userService.payloadSerialization(user);
            // }

            // const payloadAccessToken: Record<string, any> =
            //     await this.authService.createPayloadAccessToken(
            //         payload,
            //         rememberMe
            //     );
            // const payloadRefreshToken: Record<string, any> =
            //     await this.authService.createPayloadRefreshToken(
            //         payload._id,
            //         rememberMe,
            //         {
            //             loginDate: payloadAccessToken.loginDate,
            //         }
            //     );

            // const accessToken: string =
            //     await this.authService.createAccessToken(payloadAccessToken);

            // const refreshToken: string =
            //     await this.authService.createRefreshToken(
            //         payloadRefreshToken,
            //         rememberMe
            //     );

            // return {
            //     user,
            //     accessToken,
            //     refreshToken,
            // };
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: err.message
                    ? err.message
                    : 'http.serverError.internalServerError',
            });
        }
    }

    @Response('user.refresh')
    @AuthRefreshJwtGuard()
    @HttpCode(HttpStatus.OK)
    @Get('/refresh')
    async refresh(
        @User()
        { _id, rememberMe, loginDate }: Record<string, any>,
        @Token() refreshToken: string
    ): Promise<IResponse> {
        const user: IUserDocument =
            await this.userService.findOneById<IUserDocument>(_id, {
                populate: {
                    role: true,
                    permission: true,
                },
            });

        if (!user) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.notFound',
            });
        } else if (!user.isActive) {
            throw new ForbiddenException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_IS_INACTIVE_ERROR,
                message: 'user.error.inactive',
            });
        } else if (!user.role.isActive) {
            throw new ForbiddenException({
                statusCode: ENUM_ROLE_STATUS_CODE_ERROR.ROLE_IS_INACTIVE_ERROR,
                message: 'role.error.inactive',
            });
        }

        const checkPasswordExpired: boolean =
            await this.authService.checkPasswordExpired(user.passwordExpired);

        if (checkPasswordExpired) {
            throw new ForbiddenException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_PASSWORD_EXPIRED_ERROR,
                message: 'user.error.passwordExpired',
            });
        }

        const payload: UserPayloadSerialization =
            await this.userService.payloadSerialization(user);
        const payloadAccessToken: Record<string, any> =
            await this.authService.createPayloadAccessToken(
                payload,
                rememberMe,
                {
                    loginDate,
                }
            );

        const accessToken: string = await this.authService.createAccessToken(
            payloadAccessToken
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    @Response('user.upload')
    @AuthJwtGuard()
    @UploadFileSingle('file')
    @HttpCode(HttpStatus.OK)
    @Post('/profile/upload-profile-by-admin')
    async uploadByAdmin(
        @Body() body: UserProfileUploadDto,
        @UploadedFile(FileRequiredPipe, FileSizeImagePipe, FileTypeImagePipe)
        file: IFile
    ): Promise<void> {
        await this.userService.uploadProfile(file, body.userId);
        return;
    }
}
