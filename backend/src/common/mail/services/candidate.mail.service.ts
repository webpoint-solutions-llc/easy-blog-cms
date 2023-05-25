import { subjectConstant } from '../const';
import { Injectable, Optional } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CandidateMailService {
    constructor(
        private mailerService: MailerService,
        @Optional()
        private attachments: any
    ) {
        this.attachments = [
            {
                filename: 'logo.png',
                path: `${__dirname}/../assets/logo.png`,
                cid: 'logo',
            },
            {
                filename: 'facebook.png',
                path: `${__dirname}/../assets/facebook.png`,
                cid: 'facebook',
            },
            {
                filename: 'instagram.png',
                path: `${__dirname}/../assets/instagram.png`,
                cid: 'instagram',
            },
            {
                filename: 'linkedin.png',
                path: `${__dirname}/../assets/linkedin.png`,
                cid: 'linkedin',
            },
        ];
    }

    async sendCandidateWelcomeMail(email: string) {
        const url = `${process.env.CLIENT_URL}/company-dashboard/company-profile/company-edit`;

        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Talent Point!',
            template: './candidate/welcome_message',
            attachments: this.attachments,
            context: {
                url,
            },
        });
    }

    async sendNotifyProfileCompletionMail(email: string, fullName: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your Profile is Being Reviewed',
            template: './candidate/notiy_to_complete_user_profile',
            attachments: this.attachments,
            context: {
                fullName,
            },
        });
    }

    async sendUserHasRecommendedMail(
        email: string,
        fullName: string,
        title: string
    ) {
        await this.mailerService.sendMail({
            to: email,
            subject: `You've been recommended`,
            template: './candidate/user_has_recommended',
            attachments: this.attachments,
            context: {
                fullName,
                title,
            },
        });
    }

    async vettingProcessCompletionEmail(email: string, title: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'You have sucessfully completed vetting process',
            template: './complete_vetted_process',
            attachments: this.attachments,
            context: {
                heading: `Dear ${title}, You have sucessfully completed vetting process.`,
                title,
            },
        });
    }

    async sendNewsletterEmail(email: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Stay Up-to-Date with Our Latest Newsletter!',
            template: './plain_message',
            attachments: [
                ...this.attachments,
                {
                    filename: 'newsletter_employee.pdf',
                    path: `${__dirname}/../assets/newsletter_employee.pdf`,
                    cid: 'newsletter_employee',
                },
            ],
            context: {
                heading: 'Thank you for signing up for our newsletter.',
            },
        });
    }
}
