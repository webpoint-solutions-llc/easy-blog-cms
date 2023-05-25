import { CreateBlogDto } from './create-blog.dto';
import { PartialType } from '@nestjs/mapped-types';
import {
    IsDate,
    IsNotEmpty,
    IsOptional,
    IsString,
    Validate,
} from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    keyword: string;

    @IsOptional()
    @IsString()
    action: string;

    @IsOptional()
    @IsString()
    blog_uuid: string;
}
