import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthExcludeApiKey } from '~/common/auth/decorators/auth.api-key.decorator';
import { ErrorMeta } from '~/common/error/decorators/error.decorator';
import { HelperDateService } from '~/common/helper/services/helper.date.service';
import { HelperService } from '~/common/helper/services/helper.service';
import { ENUM_LOGGER_ACTION } from '~/common/logger/constants/logger.enum.constant';
import { Logger } from '~/common/logger/decorators/logger.decorator';
import {
    RequestExcludeTimestamp,
    RequestTimezone,
    RequestUserAgent,
} from '~/common/request/decorators/request.decorator';
import {
    Response,
    ResponseTimeout,
} from '~/common/response/decorators/response.decorator';
import { IResponse } from '~/common/response/response.interface';
import { IResult } from 'ua-parser-js';

@Controller({
    version: VERSION_NEUTRAL,
    path: '/',
})
export class AppController {
    constructor(
        private readonly configService: ConfigService,
        private readonly helperDateService: HelperDateService,
        private readonly helperService: HelperService
    ) {}

    @Response('app.hello')
    @AuthExcludeApiKey()
    @RequestExcludeTimestamp()
    @Logger(ENUM_LOGGER_ACTION.TEST, { tags: ['test'] })
    @Get('/hello')
    async hello(
        @RequestUserAgent() userAgent: IResult,
        @RequestTimezone() timezone: string
    ): Promise<IResponse> {
        const serviceName = this.configService.get<string>('app.name');
        const newDate = this.helperDateService.create({
            timezone: timezone,
        });

        return {
            metadata: {
                properties: {
                    serviceName,
                },
            },
            userAgent,
            date: newDate,
            format: this.helperDateService.format(newDate, {
                timezone: timezone,
            }),
            timestamp: this.helperDateService.timestamp({
                date: newDate,
                timezone: timezone,
            }),
        };
    }

    @Response('app.helloTimeout')
    @AuthExcludeApiKey()
    @RequestExcludeTimestamp()
    @ResponseTimeout('10s')
    @ErrorMeta(AppController.name, 'helloTimeoutCustom')
    @Get('/hello/timeout')
    async helloTimeout(): Promise<IResponse> {
        const serviceName = this.configService.get<string>('app.name');

        await this.helperService.delay(60000);

        return {
            metadata: {
                properties: {
                    serviceName,
                },
            },
        };
    }
}
