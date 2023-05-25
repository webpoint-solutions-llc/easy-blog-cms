import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AuthExcludeApiKey } from '~/common/auth/decorators/auth.api-key.decorator';
import { RequestExcludeTimestamp } from '~/common/request/decorators/request.decorator';
import { Response } from '~/common/response/decorators/response.decorator';
import { IResponse } from '~/common/response/response.interface';
import { MessageEnumService } from '../services/message.enum.service';

@Controller({
    version: VERSION_NEUTRAL,
    path: '/message',
})
export class MessageEnumController {
    constructor(private readonly messageEnumService: MessageEnumService) {}

    @Response('message.languages')
    @AuthExcludeApiKey()
    @RequestExcludeTimestamp()
    @Get('/languages')
    async languages(): Promise<IResponse> {
        const languages: string[] =
            await this.messageEnumService.getLanguages();
        return {
            languages,
        };
    }
}
