import {
    IsBoolean,
    IsEmail,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
} from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    website: string;

    @IsNotEmpty()
    @IsMongoId({ each: true })
    blog: string;

    @IsBoolean()
    @IsOptional()
    offensive: boolean;

    @IsOptional()
    isDeleted: boolean;
}
