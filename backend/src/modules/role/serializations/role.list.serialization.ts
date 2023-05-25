import { Types } from 'mongoose';
import { Exclude } from 'class-transformer';
import { OmitType } from '@nestjs/mapped-types';
import { RoleGetSerialization } from './role.get.serialization';
import { TransformMongoId } from '~/common/database/serialization/database.serialization';
export class RoleListSerialization extends OmitType(RoleGetSerialization, [
    'permissions',
] as const) {
    @TransformMongoId()
    readonly _id: string;

    @Exclude()
    readonly permissions: Types.ObjectId;
}
