import {
    IsArray,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MinLength,
    Validate,
} from 'class-validator';
import { Types } from 'mongoose';
import { IAwsS3 } from '~/common/aws/aws.interface';
import { BlogUniqueValidator } from '../decorators/BlogUniqueValidator.decorators';
import { CreateSeoSettingDto } from '../../seo-setting/dto/create-seo-setting.dto';

export class CreateBlogDto extends CreateSeoSettingDto {
    @IsOptional()
    @IsMongoId({ each: true })
    _id: Types.ObjectId;

    @IsNotEmpty()
    @IsString()
    @Validate(BlogUniqueValidator)
    blog_uuid: string;

    @IsArray()
    @IsNotEmpty()
    content: any;

    @IsOptional()
    @IsMongoId({ each: true })
    seoSetting: Types.ObjectId;

    @IsOptional()
    published: boolean;

    @IsOptional()
    updatedAt: Date;

    @IsOptional()
    @IsNumber()
    time_to_read: number;

    @IsOptional()
    infographic: IAwsS3;

    @IsOptional()
    lastPublishedDate: Date;

    @IsOptional()
    lastDraftDate: Date;
}
