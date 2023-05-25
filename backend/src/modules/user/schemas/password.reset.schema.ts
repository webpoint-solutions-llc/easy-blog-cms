import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PasswordResetTokenEntity {
    @Prop({
        required: true,
        type: String,
    })
    token: string;

    @Prop({
        required: true,
        type: Date,
        default: Date.now,
    })
    createdAt: Date;
}

export const PasswordResetTokenDatabaseName = 'passwordResetToken';
export const PasswordResetTokenSchema = SchemaFactory.createForClass(
    PasswordResetTokenEntity
);

export type PasswordResetTokenDocument = PasswordResetTokenEntity & Document;
