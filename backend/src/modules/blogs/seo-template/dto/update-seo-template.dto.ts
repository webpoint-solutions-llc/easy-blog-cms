import { PartialType } from '@nestjs/mapped-types';
import { CreateSeoTemplateDto } from './create-seo-template.dto';

export class UpdateSeoTemplateDto extends PartialType(CreateSeoTemplateDto) {}
