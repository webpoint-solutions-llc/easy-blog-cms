import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from '~/common/response/decorators/response.decorator';
import { SubscribeNewsletterService } from './subscribe-newsletter.service';
import { CreateSubscribeNewsletterDto } from './dto/create-subscribe-newsletter.dto';
import { UpdateSubscribeNewsletterDto } from './dto/update-subscribe-newsletter.dto';

@ApiTags('modules.subscribe-newsletter')
@Controller('subscribe-newsletter')
export class SubscribeNewsletterController {
    constructor(
        private readonly subscribeNewsletterService: SubscribeNewsletterService
    ) {}

    @Post()
    @Response('blog.subscribe')
    create(@Body() createSubscribeNewsletterDto: CreateSubscribeNewsletterDto) {
        return this.subscribeNewsletterService.create(
            createSubscribeNewsletterDto
        );
    }

    @Get()
    findAll() {
        return this.subscribeNewsletterService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.subscribeNewsletterService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSubscribeNewsletterDto: UpdateSubscribeNewsletterDto
    ) {
        return this.subscribeNewsletterService.update(
            +id,
            updateSubscribeNewsletterDto
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.subscribeNewsletterService.remove(+id);
    }
}
