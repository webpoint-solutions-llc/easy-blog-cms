import { IsNotEmpty, IsMongoId } from 'class-validator';

export class UserProfileUploadDto {
    @IsMongoId({ each: true })
    @IsNotEmpty()
    readonly userId: string;
}
