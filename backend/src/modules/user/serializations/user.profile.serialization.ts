import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { UserGetSerialization } from './user.get.serialization';

export class UserProfileSerialization extends OmitType(UserGetSerialization, [
    'passwordExpired',
    'createdAt',
]) {
    readonly passwordExpired: Date;

    @Exclude()
    readonly createdAt: Date;
}
