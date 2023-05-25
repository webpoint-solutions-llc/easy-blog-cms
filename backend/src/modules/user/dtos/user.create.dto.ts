import { Type } from 'class-transformer';
import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MaxLength,
    MinLength,
    IsMongoId,
    IsOptional,
} from 'class-validator';
import { IsPasswordStrong } from '~/common/request/validations/request.is-password-strong.validation';
import { IsStartWith } from '~/common/request/validations/request.is-start-with.validation';

interface IToken {
    readonly token: string;

    readonly createdAt: Date;
}

export class UserCreateDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @Type(() => String)
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Type(() => String)
    readonly fullName: string;

    // @IsString()
    // @IsNotEmpty()
    // @MinLength(10)
    // @MaxLength(14)
    // @Type(() => String)
    // @IsStartWith(['98'])
    readonly mobileNumber: string;

    @IsNotEmpty()
    @IsString()
    readonly role: string;

    @IsNotEmpty()
    @IsPasswordStrong()
    readonly password: string;

    @IsOptional()
    readonly token?: IToken;
}
