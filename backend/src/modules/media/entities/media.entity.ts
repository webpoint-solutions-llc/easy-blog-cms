import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IAwsS3 } from '~/common/aws/aws.interface';

@Schema({ timestamps: true, versionKey: false })
export class Media {
    @Prop({
        required: false,
        _id: false,
        type: {
            path: String,
            pathWithFilename: String,
            filename: String,
            completedUrl: String,
            baseUrl: String,
            mime: String,
            origialFileName: String,
            createdDate: Date,
            uploadedBy: String,
            alt: String,
            title: String,
            seoCode: String,
            description: String,
            dimension: {
                height: Number,
                width: Number,
            },
            size: Number,
        },
    })
    file?: IAwsS3;
}

export const MediaApiDatabaseName = 'media';
export const MediaApiSchema = SchemaFactory.createForClass(Media);

export type MediaApiDocument = Media & Document;
