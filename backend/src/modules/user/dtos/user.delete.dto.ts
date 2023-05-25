import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsPasswordStrong } from '~/common/request/validations/request.is-password-strong.validation';

export class UserDeleteDto {
    @IsNotEmpty()
    readonly password: string;

    @IsOptional()
    readonly reason: string;
}
