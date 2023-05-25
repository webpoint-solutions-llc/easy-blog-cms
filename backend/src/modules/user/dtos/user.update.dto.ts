import { IsOptional } from 'class-validator';
import { UserCreateDto } from './user.create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UserUpdateDto extends PartialType(UserCreateDto) {
    @IsOptional()
    readonly isDeleted?: boolean;

    @IsOptional()
    readonly reason?: string;

    @IsOptional()
    readonly lastLogin?: Date;
}
