import { OmitType } from '@nestjs/mapped-types';
import { Exclude, Type } from 'class-transformer';
import { IAwsS3 } from '~/common/aws/aws.interface';
import { UserGetSerialization } from './user.get.serialization';
import { TransformMongoId } from '~/common/database/serialization/database.serialization';

export class UserListSerialization extends OmitType(UserGetSerialization, [
    'role',
    'photo',
    'passwordExpired',
] as const) {
    @TransformMongoId()
    readonly _id: string;

    @Exclude()
    readonly passwordExpired: Date;
}
