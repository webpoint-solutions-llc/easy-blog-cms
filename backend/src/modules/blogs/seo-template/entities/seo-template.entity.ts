import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class SeoTemplate {
    @Prop({
        required: true,
        type: String,
    })
    heading: string;

    @Prop({
        required: true,
        type: String,
    })
    url: string;

    @Prop({
        required: true,
        type: String,
    })
    meta_title: string;

    @Prop({
        required: false,
        type: String,
    })
    meta_description: string;

    @Prop({
        required: false,
        type: String,
    })
    meta_keywords: string;

    @Prop({
        required: false,
        type: String,
    })
    pageType: string;
}
export const SeoSettingApiDatabaseName = 'seoTemplates';
export const SeoSettingApiSchema = SchemaFactory.createForClass(SeoTemplate);

export type SeoTemplateDocument = SeoTemplate & Document;
