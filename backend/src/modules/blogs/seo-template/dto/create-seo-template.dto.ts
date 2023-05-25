import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateSeoTemplateDto {
    @IsNotEmpty()
    @IsString()
    heading: string;

    @IsNotEmpty()
    @IsString()
    url: string;

    @IsNotEmpty()
    @IsString()
    meta_title: string;

    @IsString()
    @IsOptional()
    meta_description: string;

    @IsNotEmpty()
    @IsString()
    meta_keywords: string;

    @IsNotEmpty()
    @IsString()
    pageType: string;
}
