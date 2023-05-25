import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CallbackWithoutResultAndOptionalError, Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Tag {
    @Prop({
        required: true,
        type: String,
        lowercase: true,
        unique: true,
        trim: true,
    })
    name: string;
}

export const TagApiDatabaseName = 'tags';
export const TagApiSchema = SchemaFactory.createForClass(Tag);
export type TagDocument = Tag & Document;
