import { IsNotEmpty, IsString } from 'class-validator';

export class SocialLoginCodeDto {
    @IsString()
    @IsNotEmpty()
    readonly code: string;

    @IsString()
    @IsNotEmpty()
    readonly role: string;
}
