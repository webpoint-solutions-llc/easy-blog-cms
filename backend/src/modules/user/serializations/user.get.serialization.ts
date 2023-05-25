import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IAwsS3 } from '~/common/aws/aws.interface';
import { TransformMongoId } from '~/common/database/serialization/database.serialization';
import { IRoleDocument } from '~/modules/role/role.interface';

export class UserGetSerialization {
    @TransformMongoId()
    readonly _id: string;

    //TODO for social login
    @Transform(({ value }) => ({
        name: value.name,
        permissions:
            value.permissions !== undefined
                ? value.permissions.map((val: Record<string, any>) => ({
                      name: val.name,
                      isActive: val.isActive,
                      code: val.code,
                  }))
                : '',
        accessFor: value.accessFor,
        isActive: value.isActive,
    }))
    readonly role: IRoleDocument;

    readonly email: string;
    readonly mobileNumber: string;
    readonly isActive: boolean;
    readonly firstName: string;
    readonly lastName: string;
    readonly photo?: IAwsS3;

    @Expose()
    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    @Exclude()
    readonly password: string;

    readonly passwordExpired: Date;

    @Exclude()
    readonly salt: string;

    readonly createdAt: Date;

    readonly updatedAt: Date;
}
