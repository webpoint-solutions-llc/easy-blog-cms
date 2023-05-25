import { subjectConstant } from '../const';
import { Injectable, Optional } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class CompanyMailService {
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

    async sendWelcomeMail(email: string, companyName: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: subjectConstant.THANKS_CHOOSING_SUBJECT,
            template: './company/welcome_message',
            attachments: this.attachments,
            context: {
                clientName: companyName,
            },
        });
    }

    async sendIntroductionMail(email: string, fullName: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Talent Recommendations for Your Requirements',
            template: './company/introduction',
            attachments: this.attachments,
            context: {
                fullName,
            },
        });
    }
    async sendTalentRecomendationMail(email: string, fullName: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Recommended Talent List for Your Skillset Needs',
            template: './company/talent_recommend',
            attachments: this.attachments,
            context: {
                fullName,
                jobPage: `/company-dashboard/applicants/needs-review`,
            },
        });
    }

    async sendCvRejectedMail(email: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Request for Feedback on Rejecting our recommended talent',
            template: './plain_message',
            attachments: this.attachments,
            context: {
                heading:
                    'Appreciated! We would like to know why the CV was rejected as we provided it to you in accordance with your needs of skills and qualifications. We are always available to address any issues and find solutions.',
            },
        });
    }

    async sendRelationshipMail(email: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Discussing Ongoing Recruitment Needs',
            template: './plain_message',
            attachments: this.attachments,
            context: {
                heading:
                    'Thank you for choosing us as your recruitment firm. We value our partnership with your company. Would you like to discuss your ongoing recruitment needs and how we can help further.',
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
                    filename: 'newsletter_employer.pdf',
                    path: `${__dirname}/../assets/newsletter_employer.pdf`,
                    cid: 'newsletter_employer',
                },
            ],
            context: {
                heading: 'Thank you for signing up for our newsletter.',
            },
        });
    }
}
