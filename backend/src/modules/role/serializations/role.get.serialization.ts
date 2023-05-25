import { Exclude, Transform, Type } from 'class-transformer';
import { ENUM_AUTH_ACCESS_FOR } from '~/common/auth/constants/auth.enum.constant';
import { TransformMongoId } from '~/common/database/serialization/database.serialization';
import { PermissionDocument } from '~/modules/permission/schemas/permission.schema';

export class RoleGetSerialization {
    @TransformMongoId()
    readonly _id: string;

    readonly isActive: boolean;
    readonly name: string;
    readonly accessFor: ENUM_AUTH_ACCESS_FOR;

    @Transform(({ obj }) =>
        obj.permissions.map((val: PermissionDocument) => ({
            _id: `${val._id}`,
            code: val.code,
            name: val.name,
            isActive: val.isActive,
        }))
    )
    readonly permissions: PermissionDocument[];

    readonly createdAt: Date;

    @Exclude()
    readonly updatedAt: Date;
}
