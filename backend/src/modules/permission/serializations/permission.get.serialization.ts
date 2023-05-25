import { Exclude, Type } from 'class-transformer';
import { TransformMongoId } from '~/common/database/serialization/database.serialization';

export class PermissionGetSerialization {
    @TransformMongoId()
    readonly _id: string;

    readonly isActive: boolean;
    readonly name: string;
    readonly code: string;
    readonly description: string;
    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
