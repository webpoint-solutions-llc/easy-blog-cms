import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
    CallbackWithoutResultAndOptionalError,
    Document,
    SchemaTypes,
    Types,
} from 'mongoose';
import { Tag } from '../../tag/entities/tag.entity';
import { UserEntity } from '~/modules/user/schemas/user.schema';
import { BlogCategory } from '../../blog-category/entities/blog-category.entity';
import { Blog } from '../../blog/entities/blog.entity';

@Schema({ timestamps: true, versionKey: false })
export class SeoSetting {
    @Prop({
        required: false,
        type: String,
    })
    title: string;

    @Prop({
        required: false,
        type: String,
    })
    url: string;

    @Prop({
        required: false,
        type: [SchemaTypes.ObjectId],
        ref: UserEntity.name,
    })
    author: Types.ObjectId[];

    @Prop({
        required: false,
        type: String,
    })
    creditTo: string;

    @Prop({
        required: false,
        type: [SchemaTypes.ObjectId],
        ref: Tag.name,
    })
    tags: Types.ObjectId[];

    @Prop({
        required: false,
        type: [SchemaTypes.ObjectId],
        ref: BlogCategory.name,
    })
    categories: Types.ObjectId[];

    @Prop({
        required: false,
        type: String,
    })
    meta_description: string;

    @Prop({
        required: false,
        unique: true,
        sparse: true,
        trim: true,
        type: String,
    })
    keyword: string;

    @Prop({
        required: false,
        unique: true,
        sparse: true,
        trim: true,
        type: String,
    })
    slug: string;
}
export const SeoSettingApiDatabaseName = 'seoSettings';
export const SeoSettingApiSchema = SchemaFactory.createForClass(SeoSetting);

export type SeoSettingDocument = SeoSetting & Document;
