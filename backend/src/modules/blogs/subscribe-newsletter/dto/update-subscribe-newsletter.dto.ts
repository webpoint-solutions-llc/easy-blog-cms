import { PartialType } from '@nestjs/mapped-types';
import { CreateSubscribeNewsletterDto } from './create-subscribe-newsletter.dto';

export class UpdateSubscribeNewsletterDto extends PartialType(CreateSubscribeNewsletterDto) {}
