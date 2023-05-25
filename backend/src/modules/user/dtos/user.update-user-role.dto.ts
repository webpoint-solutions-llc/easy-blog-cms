import { IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ENUM_ROLES } from '../constants/user.constant';

export class UserRoleUpdateDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(ENUM_ROLES)
    readonly role: ENUM_ROLES;
}
