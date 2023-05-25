import { PartialType } from '@nestjs/mapped-types';
import { CreateSeoSettingDto } from './create-seo-setting.dto';

export class UpdateSeoSettingDto extends PartialType(CreateSeoSettingDto) {}
