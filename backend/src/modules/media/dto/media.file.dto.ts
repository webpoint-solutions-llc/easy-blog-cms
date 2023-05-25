import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class MediaFileDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsOptional()
    seoCode: string;

    @IsString()
    @IsNotEmpty()
    alt: string;
}
