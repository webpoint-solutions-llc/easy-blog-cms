import { MediaFileDto } from './media.file.dto';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class UpdateMediaDto {
    @ValidateNested()
    file: MediaFileDto;
}
