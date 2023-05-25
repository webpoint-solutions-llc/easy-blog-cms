import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class BlogCategory {
    @Prop({
        required: false,
        type: String,
        unique: true,
    })
    name: string;

    @Prop({
        required: true,
        type: String,
    })
    slug: string;

    @Prop({
        required: false,
        type: String,
    })
    description: string;

    @Prop({
        required: false,
        type: Boolean,
        default: false,
    })
    isDeleted: boolean;
}
export const BlogCategoryApiDatabaseName = 'blogCategories';
export const BlogCategoryApiSchema = SchemaFactory.createForClass(BlogCategory);

export type BlogCategoryDocument = BlogCategory & Document;
