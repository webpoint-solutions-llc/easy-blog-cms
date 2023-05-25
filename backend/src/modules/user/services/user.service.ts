import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import {
    IDatabaseFindAllOptions,
    IDatabaseFindOneOptions,
} from '~/common/database/database.interface';
import {
    PasswordResetTokenDocument,
    PasswordResetTokenEntity,
} from '../schemas/password.reset.schema';
import { ObjectID } from 'bson';
import { ConfigService } from '@nestjs/config';
import { Model, ObjectId, Types } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { IAwsS3 } from '~/common/aws/aws.interface';
import { IFile } from '~/common/file/file.interface';
import { LoginAs } from '../constants/user.constant';
import { UserUpdateDto } from '../dtos/user.update.dto';
import { UserCreateDto } from '../dtos/user.create.dto';
import { UserInactiveDto } from '../dtos/user.inactive.dto';
import { IAuthPassword } from '~/common/auth/auth.interface';
import { ROLES } from '~/modules/role/constants/role.constant';
import { UserDocument, UserEntity } from '../schemas/user.schema';
import { AuthService } from '~/common/auth/services/auth.service';
import { RoleService } from '~/modules/role/services/role.service';
import { AwsS3Service } from '~/common/aws/services/aws.s3.service';
import { RoleDocument, RoleEntity } from '~/modules/role/schemas/role.schema';
import { Blog, BlogDocument } from '~/modules/blogs/blog/entities/blog.entity';
import { IUserCheckExist, IUserCreate, IUserDocument } from '../user.interface';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { HelperHashService } from '~/common/helper/services/helper.hash.service';
import { CompanyMailService } from '~/common/mail/services/company.mail.service';
import { PermissionEntity } from '~/modules/permission/schemas/permission.schema';
import { HelperStringService } from '~/common/helper/services/helper.string.service';
import { ENUM_USER_STATUS_CODE_ERROR } from '../constants/user.status-code.constant';
import { CandidateMailService } from '~/common/mail/services/candidate.mail.service';
import { UserPayloadSerialization } from '../serializations/user.payload.serialization';
import { ENUM_ROLE_STATUS_CODE_ERROR } from '~/modules/role/constants/role.status-code.constant';
import { ENUM_ERROR_STATUS_CODE_ERROR } from '~/common/error/constants/error.status-code.constant';
@Injectable()
export class UserService {
    private readonly uploadPath: string;
    private readonly verficationEmailExpireTime: number;
    private saltLength: number;

    constructor(
        @DatabaseEntity(PasswordResetTokenEntity.name)
        private readonly userResetModel: Model<PasswordResetTokenDocument>,
        @DatabaseEntity(UserEntity.name)
        private readonly userModel: Model<UserDocument>,
        @DatabaseEntity(Blog.name)
        private readonly blogModel: Model<BlogDocument>,
        private readonly helperStringService: HelperStringService,
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly roleService: RoleService,
        private readonly awsService: AwsS3Service,
        private readonly helperHashService: HelperHashService,
        private readonly config: ConfigService,
        private readonly companyMailService: CompanyMailService,
        private readonly candidateMailService: CandidateMailService
    ) {
        this.uploadPath = this.configService.get<string>('user.uploadPath');
        this.verficationEmailExpireTime = parseInt(
            this.configService.get<string>('user.verficationEmailExpireTime')
        );
        this.saltLength = this.config.get('auth.saltLength');
    }

    async createUser(body: UserCreateDto) {
        const findRole: RoleDocument =
            await this.roleService.findOne<RoleDocument>({
                name: body.role,
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

        const checkExist: IUserCheckExist = await this.checkExist(
            body.email,
            body.mobileNumber
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

            const create = await this.create({
                fullName: body.fullName,
                email: body.email,
                mobileNumber: body?.mobileNumber,
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

            const link = `${process.env.CLIENT_URL}/confirmation?token=${hash}&id=${create._id}`;

            const user: IUserDocument = await this.findOneById<IUserDocument>(
                create._id,
                {
                    populate: {
                        role: true,
                        permission: true,
                    },
                }
            );

            const payload: UserPayloadSerialization =
                await this.payloadSerialization(user);
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
                user: create,
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

    async findAll(
        find?: Record<string, any>,
        options?: IDatabaseFindAllOptions
    ): Promise<IUserDocument[]> {
        const users = this.userModel.find(find).populate({
            path: 'role',
            model: RoleEntity.name,
        });

        if (
            options &&
            options.limit !== undefined &&
            options.skip !== undefined
        ) {
            users.limit(options.limit).skip(options.skip);
        }

        if (options && options.sort) {
            users.sort(options.sort);
        }

        return users.lean();
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.userModel.countDocuments(find);
    }

    async countBlogByUser(_id: ObjectID) {
        return await this.blogModel.count({ author: _id });
    }

    async findOneById<T>(
        _id: string | ObjectID,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const user = this.userModel.findById(_id);

        if (
            options &&
            options.populate &&
            options.populate.role &&
            options.populate.permission
        ) {
            user.populate({
                path: 'role',
                model: RoleEntity.name,
                populate: {
                    path: 'permissions',
                    model: PermissionEntity.name,
                },
            });
        } else if (options && options.populate && options.populate.role) {
            user.populate({
                path: 'role',
                model: RoleEntity.name,
            });
        }

        return user.lean();
    }

    async findOne<T>(
        find?: Record<string, any>,
        options?: IDatabaseFindOneOptions
    ): Promise<T> {
        const user = this.userModel.findOne(find);

        if (
            options &&
            options.populate &&
            options.populate.role &&
            options.populate.permission
        ) {
            user.populate({
                path: 'role',
                model: RoleEntity.name,
                populate: {
                    path: 'permissions',
                    model: PermissionEntity.name,
                },
            });
        } else if (options && options.populate && options.populate.role) {
            user.populate({
                path: 'role',
                model: RoleEntity.name,
            });
        }

        return user.lean();
    }

    async createWithGoogle(
        userData: { fullName: string; email: string },
        role
    ): Promise<UserDocument> {
        const { fullName, email } = userData;
        const passwords = await this.authService.createPassword(
            '' // TODO
        );

        const user: UserEntity = {
            fullName,
            uniqueName: this.helperStringService.generateUniqueName(fullName),
            email,
            mobileNumber: '',
            password: passwords.passwordHash,
            role,
            isActive: true,
            passwordExpired: passwords.passwordExpired,
            salt: passwords.salt,
            googleSignIn: true,
            linkedinSignIn: false,
            isEmailVerified: true,
        };

        const create: UserDocument = new this.userModel(user);
        return create.save();
    }

    //create account with linkedin
    async createWithLinked(
        userData: { firstName: string; email: string; lastName?: string },
        role
    ): Promise<UserDocument> {
        const { firstName, email, lastName } = userData;
        const passwords = await this.authService.createPassword(
            '' // TODO
        );

        const user: UserEntity = {
            fullName: '',
            email,
            mobileNumber: '',
            password: passwords.passwordHash,
            role,
            isActive: true,

            passwordExpired: passwords.passwordExpired,
            salt: passwords.salt,
            googleSignIn: false,
            linkedinSignIn: true,
            isEmailVerified: false,
        };

        const create: UserDocument = new this.userModel(user);
        return create.save();
    }

    async create({
        fullName,
        password,
        passwordExpired,
        salt,
        email,
        mobileNumber,
        role,
    }: IUserCreate): Promise<UserDocument> {
        const user: UserEntity = {
            fullName,
            uniqueName: this.helperStringService.generateUniqueName(fullName),
            email,
            mobileNumber,
            password,
            role: new Types.ObjectId(role),
            isActive: true,
            salt,
            passwordExpired,
            googleSignIn: false,
            linkedinSignIn: false,
            isEmailVerified: false,
        };

        const create: UserDocument = new this.userModel(user);
        return create.save();
    }

    async deleteOneById(_id: string | ObjectID): Promise<UserDocument> {
        return this.userModel.findByIdAndDelete(_id);
    }

    async deleteOne(find: Record<string, any>): Promise<UserDocument> {
        return this.userModel.findOneAndDelete(find);
    }

    async updateOneById(
        _id: ObjectID,
        userUpdateDto: UserUpdateDto
    ): Promise<UserDocument> {
        // const user: UserDocument = await this.userModel.findById(_id);

        // user.firstName = firstName;
        // user.lastName = lastName || undefined;

        return await this.userModel.findByIdAndUpdate(
            _id,
            { $set: userUpdateDto },
            { new: true, useFindAndModify: false }
        );

        // return user.save();
    }

    async checkExist(
        email: string,
        mobileNumber?: string,
        _id?: string
    ): Promise<IUserCheckExist> {
        const existEmail: Record<string, any> = await this.userModel.exists({
            email: {
                $regex: new RegExp(email),
                $options: 'i',
            },
            _id: { $nin: [new Types.ObjectId(_id)] },
        });

        const existMobileNumber: Record<string, any> =
            await this.userModel.exists({
                mobileNumber,
                _id: { $nin: [new Types.ObjectId(_id)] },
            });

        return {
            email: existEmail ? true : false,
            mobileNumber: existMobileNumber ? true : false,
        };
    }

    async updatePhoto(_id: string, aws: IAwsS3): Promise<UserDocument> {
        const user: UserDocument = await this.userModel.findById(_id);
        user.photo = aws;

        return user.save();
    }

    async createRandomFilename(): Promise<Record<string, any>> {
        const filename: string = this.helperStringService.random(20);

        return {
            path: this.uploadPath,
            filename: filename,
        };
    }

    async updatePassword(
        _id: string,
        { salt, passwordHash, passwordExpired }: IAuthPassword
    ): Promise<UserDocument> {
        const auth: UserDocument = await this.userModel.findById(_id);

        auth.password = passwordHash;
        auth.passwordExpired = passwordExpired;
        auth.salt = salt;

        return auth.save();
    }

    async updatePasswordExpired(
        _id: string,
        passwordExpired: Date
    ): Promise<UserDocument> {
        const auth: UserDocument = await this.userModel.findById(_id);
        auth.passwordExpired = passwordExpired;

        return auth.save();
    }

    async validatePassword(id: ObjectID, password) {
        const _id = new ObjectID(id);
        const user = await this.findOneById<IUserDocument>(_id, {
            populate: { role: true },
        });

        if (!user) throw new NotFoundException('User not found');

        // compare password with hash
        const validate: boolean = await this.authService.validateUser(
            password,
            user.password
        );

        return { user, validate };
    }

    async inactive(
        _id: ObjectID,
        body: UserInactiveDto
    ): Promise<UserDocument> {
        const user: UserDocument = await this.userModel.findById(_id);
        user.reason = body.reason;
        user.isActive = false;
        return user.save();
    }

    async active(_id: string): Promise<UserDocument> {
        const user: UserDocument = await this.userModel.findById(_id);

        user.isActive = true;
        return user.save();
    }

    async isUserAdmin(_id: ObjectID) {
        const user = await this.findOneById<IUserDocument>(_id, {
            populate: { role: true },
        });

        return user.role.name === ROLES.SUPERADMIN;
    }

    getTimeDiff(created, current): number {
        let diff = (created - current) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    }

    async verifyEmail(token: string, _id: string): Promise<UserDocument> {
        const user: IUserDocument = await this.userModel
            .findById(new ObjectID(_id))
            .populate('role');

        const isValid: boolean = await this.helperHashService.bcryptCompare(
            _id,
            token.replace(/slash/g, '/')
        );

        if (!isValid) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.invalidToken',
            });
        }

        if (user?.isEmailVerified) {
            throw new NotFoundException({
                statusCode: ENUM_USER_STATUS_CODE_ERROR.USER_NOT_FOUND_ERROR,
                message: 'user.error.active',
            });
        }

        const timeDifference = this.getTimeDiff(
            new Date(user.createdAt).getTime(),
            new Date().getTime()
        );

        if (this.verficationEmailExpireTime < timeDifference) {
            throw new BadRequestException({
                statusCode:
                    ENUM_USER_STATUS_CODE_ERROR.USER_VERIFICATION_TIME_EXCEED,
                message: 'user.error.verificationTimeExceed',
            });
        }

        user.isEmailVerified = true;
        const result = await user.save();

        // Mail welcome message after user creation.
        if (user.role.name === ROLES.COMPANY)
            this.companyMailService.sendWelcomeMail(user.email, user.fullName);
        else this.candidateMailService.sendCandidateWelcomeMail(user.email);

        return result;
    }

    async payloadSerialization(
        data: IUserDocument
    ): Promise<UserPayloadSerialization> {
        return plainToInstance(UserPayloadSerialization, data);
    }

    async createPasswordToken(token: string) {
        return await this.userResetModel.create({ token });
    }

    async findPasswordToken(token: string) {
        return await this.userResetModel.findOne({ token });
    }

    async uploadProfile(file: IFile, userId: string) {
        const filename: string = file.originalname;
        const content: Buffer = file.buffer;
        const mime: string = filename
            .substring(filename.lastIndexOf('.') + 1, filename.length)
            .toUpperCase();

        const path = await this.createRandomFilename();

        try {
            const aws: IAwsS3 = await this.awsService.putItemInBucket(
                `${path.filename}.${mime}`,
                content,
                {
                    path: `${path.path}/${userId}`,
                    originalFileName: filename,
                }
            );

            return await this.updatePhoto(userId, aws);
        } catch (err: any) {
            throw new InternalServerErrorException({
                statusCode: ENUM_ERROR_STATUS_CODE_ERROR.ERROR_UNKNOWN,
                message: 'http.serverError.internalServerError',
                error: err.message,
            });
        }
    }

    async getCompanyOrCandiateDetail(_id: ObjectID) {
        let candidateComanyDetail = null;
        const user: IUserDocument = await this.findOne<IUserDocument>(
            {
                _id,
            },
            {
                populate: {
                    role: true,
                    permission: true,
                },
            }
        );

        return candidateComanyDetail;
    }

    async getUserInformation(uniqueName: string) {
        const user: IUserDocument = await this.findOne({ uniqueName });

        const candiateOrCompanyDetail = await this.getCompanyOrCandiateDetail(
            user._id
        );

        if (!candiateOrCompanyDetail)
            throw new NotFoundException(
                'The user has not completed their profile.'
            );

        return candiateOrCompanyDetail;
    }
}
