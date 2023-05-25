import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { IAwsS3 } from '~/common/aws/aws.interface';
import { RoleEntity } from '~/modules/role/schemas/role.schema';

@Schema()
class IToken {
    @Prop({
        required: true,
        type: String,
    })
    token: string;

    @Prop({
        required: true,
        type: Date,
        default: Date.now,
    })
    createdAt: Date;
}

@Schema({ timestamps: true, versionKey: false })
export class UserEntity {
    @Prop({
        required: true,
    })
    fullName: string;

    @Prop({
        required: false,
    })
    uniqueName?: string;

    @Prop({
        // required: true,
        // index: true,
        // unique: true,
        trim: true,
    })
    mobileNumber: string;

    @Prop({
        required: true,
        index: true,
        unique: true,
        lowercase: true,
        trim: true,
    })
    email: string;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: RoleEntity.name,
    })
    role: Types.ObjectId;

    @Prop({
        required: true,
    })
    password: string;

    @Prop({
        required: true,
    })
    passwordExpired: Date;

    @Prop({
        required: true,
    })
    salt: string;

    @Prop({
        required: true,
        default: true,
    })
    isActive: boolean;

    @Prop({
        required: false,
        default: false,
    })
    isDeleted?: boolean;

    @Prop({
        required: true,
        default: true,
    })
    isEmailVerified: boolean;

    @Prop({
        required: false,
        _id: false,
        type: {
            path: String,
            pathWithFilename: String,
            filename: String,
            completedUrl: String,
            baseUrl: String,
            mime: String,
        },
    })
    photo?: IAwsS3;

    @Prop({
        required: false,
        default: false,
    })
    googleSignIn: boolean;

    @Prop({
        required: false,
        default: false,
    })
    linkedinSignIn: boolean;

    @Prop({
        required: false,
    })
    reason?: string;

    createdAt?: Date;

    updatedAt?: Date;

    @Prop({
        required: false,
    })
    lastLogin?: Date;

    isOnline?: boolean;

    @Prop({
        required: false,
        _id: false,
    })
    token?: IToken;
}

export const UserDatabaseName = 'users';
export const UserSchema = SchemaFactory.createForClass(UserEntity);

export type UserDocument = UserEntity & Document;
