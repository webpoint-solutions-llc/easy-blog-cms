import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AdminMailService } from './services/admin.mail.service';
import { CompanyMailService } from './services/company.mail.service';
import { CandidateMailService } from './services/candidate.mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
@Global()
@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: async (config: ConfigService) => ({
                transport: {
                    host: config.get('MAIL_HOST'),
                    secure: true,
                    port: 465,
                    auth: {
                        user: config.get('MAIL_USER'),
                        pass: config.get('MAIL_PASSWORD'),
                    },
                },
                defaults: {
                    from: `${config.get('MAIL_FROM_PREFIX')} ${config.get(
                        'MAIL_FROM'
                    )}`,
                },
                template: {
                    dir: join(__dirname, 'template'),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [
        MailService,
        AdminMailService,
        CandidateMailService,
        CompanyMailService,
    ],
    exports: [
        MailService,
        AdminMailService,
        CandidateMailService,
        CompanyMailService,
    ],
})
export class MailModule {}
