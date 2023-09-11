import { Global, Module } from '@nestjs/common';
import { cwd } from 'process';
import * as path from 'path';
import { I18nModule, HeaderResolver, I18nJsonLoader } from 'nestjs-i18n';
import { ConfigService } from '@nestjs/config';
import { MessageService } from './services/message.service';
import { MessageEnumService } from './services/message.enum.service';
import { ENUM_MESSAGE_LANGUAGE } from './constants/message.enum.constant';

@Global()
@Module({
    providers: [MessageService, MessageEnumService],
    exports: [MessageService, MessageEnumService],
    imports: [
        I18nModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                fallbackLanguage: configService.get<string>('app.language'),
                fallbacks: Object.values(ENUM_MESSAGE_LANGUAGE).reduce(
                    (a, v) => ({ ...a, [`${v}-*`]: v }),
                    {}
                ),
                loaderOptions: {
                    path: path.join(__dirname, '/languages/'),
                    watch: true,
                },
            }),
            loader: I18nJsonLoader,
            inject: [ConfigService],
            resolvers: [new HeaderResolver(['x-custom-lang'])],
        }),
    ],
    controllers: [],
})
export class MessageModule {}
