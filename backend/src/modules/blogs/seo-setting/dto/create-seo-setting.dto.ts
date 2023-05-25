import {
    ArrayMinSize,
    IsArray,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    ValidateIf,
} from 'class-validator';
import { Types } from 'mongoose';
import { Transform } from 'class-transformer';

export class CreateSeoSettingDto {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    url: string;

    @IsOptional()
    @IsString()
    meta_description: string;

    @IsOptional()
    @IsString()
    @ValidateIf((e) => e.keyword !== '')
    @Transform((param) => param.value.toLowerCase())
    keyword: string;

    @IsOptional()
    @IsString()
    @ValidateIf((e) => e.slug !== '')
    @Transform((param) => param.value.toLowerCase())
    slug: string;

    @IsOptional()
    @IsString()
    creditTo: string;

    @IsMongoId({ each: true })
    @IsOptional()
    categories: Types.ObjectId[];

    @IsMongoId({ each: true })
    @IsOptional()
    author: Types.ObjectId[];

    @IsOptional()
    @IsArray()
    tags: string[];
}
