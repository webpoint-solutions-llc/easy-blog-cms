import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class SubscribeNewsletter {
    @Prop({
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    })
    email: string;

    @Prop({
        required: false,
        default: false,
    })
    isCandidate: boolean;

    @Prop({
        default: false,
        required: false,
    })
    isCompany: boolean;

    @Prop({
        required: true,
        trim: true,
        lowercase: true,
    })
    type: string;
}

export const SubscribeNewsletterApiDatabaseName = 'subscribeNewsletter';
export const SubscribeNewsletterApiSchema =
    SchemaFactory.createForClass(SubscribeNewsletter);

export type SubscribeNewsletterApiDocument = SubscribeNewsletter & Document;
