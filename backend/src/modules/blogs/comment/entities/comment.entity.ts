import { Blog } from '../../blog/entities/blog.entity';
import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true, versionKey: false })
export class Comment {
    @Prop({
        required: true,
        type: String,
        trim: true,
    })
    message: string;

    @Prop({
        required: true,
        type: SchemaTypes.ObjectId,
        ref: Blog.name,
    })
    blog: Types.ObjectId;

    @Prop({
        required: true,
        type: String,
        trim: true,
    })
    name: string;

    @Prop({
        required: true,
        type: String,
        trim: true,
    })
    email: string;

    @Prop({
        required: false,
        type: String,
        trim: true,
    })
    website: string;

    @Prop({
        required: false,
        type: Boolean,
        default: false,
        trim: true,
    })
    offensive: boolean;

    @Prop({
        required: false,
        type: Boolean,
    })
    isDeleted: boolean;
}

export const CommentApiDatabaseName = 'comments';
export const CommentApiSchema = SchemaFactory.createForClass(Comment);

export type CommentDocument = Comment & Document;
