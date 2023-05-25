import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';
export class CreateSubscribeNewsletterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsBoolean()
    @IsOptional()
    isCandidate: boolean;

    @IsBoolean()
    @IsOptional()
    isCompany: boolean;
}
