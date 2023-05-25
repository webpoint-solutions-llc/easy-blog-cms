import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserInactiveDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    reason: string;
}
