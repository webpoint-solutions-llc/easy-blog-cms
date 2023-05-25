import { IAwsS3 } from '~/common/aws/aws.interface';
import { Document, SchemaTypes, Types } from 'mongoose';
import { ICta, IHero } from '../interfaces/blog.interface';
import { Media } from '~/modules/media/entities/media.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserEntity } from '~/modules/user/schemas/user.schema';
import { SeoSetting } from '../../seo-setting/entities/seo-setting.entity';
@Schema({ timestamps: true, versionKey: false })
export class Blog {
    @Prop({
        required: true,
        type: String,
        trim: true,
        unique: true,
    })
    blog_uuid: string;

    @Prop({
        required: false,
        type: {
            title: String,
            image: SchemaTypes.ObjectId,
            thumbnail: SchemaTypes.ObjectId,
        },
    })
    hero: IHero;

    @Prop({
        required: true,
        type: {
            employee: {
                link: String,
                image: SchemaTypes.ObjectId,
            },
            employer: {
                link: String,
                image: SchemaTypes.ObjectId,
            },
            newsLetter: Boolean,
        },
    })
    cta: ICta;

    @Prop({
        required: true,
        trim: true,
        type: Types.Array,
    })
    content: [];

    @Prop({
        required: false,
        type: Number,
    })
    time_to_read: number;

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: UserEntity.name,
    })
    author: Types.ObjectId;

    @Prop({
        required: true,
        unique: true,
        type: SchemaTypes.ObjectId,
        ref: SeoSetting.name,
    })
    seoSetting: Types.ObjectId;

    @Prop({
        required: false,
        type: Number,
        default: 0,
    })
    count: number;

    @Prop({
        required: false,
        type: Boolean,
        default: false,
    })
    published: boolean;

    @Prop({
        required: false,
        type: Date,
    })
    lastPublishedDate: Date;

    @Prop({
        required: false,
        type: Date,
    })
    lastDraftDate: Date;

    @Prop({
        required: false,
        type: Date,
        default: Date.now,
    })
    updatedAt: Date;

    @Prop({
        required: false,
        type: Boolean,
        default: false,
    })
    isDeleted: boolean;

    @Prop({
        required: false,
        type: SchemaTypes.ObjectId,
    })
    infographic: Types.ObjectId;

    @Prop({
        required: true,
        type: [SchemaTypes.ObjectId],
        ref: Media.name,
    })
    mediaList: Types.ObjectId[];
}

export const BlogApiDatabaseName = 'blogs';
export const BlogApiSchema = SchemaFactory.createForClass(Blog);

export type BlogDocument = Blog & Document;
