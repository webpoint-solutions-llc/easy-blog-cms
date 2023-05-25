import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    MaxLength,
    MinLength,
    IsMongoId,
    IsEnum,
    IsArray,
    ArrayNotEmpty,
    IsOptional,
} from 'class-validator';
import {
    ENUM_AUTH_ACCESS_FOR_DEFAULT,
    ENUM_PORTAL,
} from '~/common/auth/constants/auth.enum.constant';

export class RoleCreateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(30)
    @Type(() => String)
    readonly name: string;

    @IsMongoId({ each: true })
    @ArrayNotEmpty()
    @IsArray()
    @IsNotEmpty()
    readonly permissions: string[];

    @IsEnum(ENUM_PORTAL)
    @IsOptional()
    readonly portal?: ENUM_PORTAL;

    @IsEnum(ENUM_AUTH_ACCESS_FOR_DEFAULT)
    @IsNotEmpty()
    readonly accessFor: ENUM_AUTH_ACCESS_FOR_DEFAULT;
}
