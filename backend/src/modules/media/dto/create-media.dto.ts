import { IAwsS3 } from '~/common/aws/aws.interface';
import { IsOptional, IsString } from 'class-validator';

export class CreateMediaDto {
    file: IAwsS3;
}

export class CreateMediaFromBodyDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    alt: string;
}
