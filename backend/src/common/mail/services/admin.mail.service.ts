import { subjectConstant } from '../const';
import { Injectable, Optional } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AdminMailService {
    constructor(
        private mailerService: MailerService,
        @Optional()
        private adminMailAddress: string,
        @Optional()
        private attachments: any
    ) {
        this.adminMailAddress = 'marketing@talentpoint.io';
        this.attachments = [
            {
                filename: 'logo.png',
                path: `${__dirname}/../assets/logo.png`,
                cid: 'logo',
            },
            {
                filename: 'mail-open.png',
                path: `${__dirname}/../assets/mail-open.png`,
                cid: 'mail-open',
            },
            {
                filename: 'facebook.png',
                path: `${__dirname}/../assets/facebook.png`,
                cid: 'facebook',
            },
            {
                filename: 'google.png',
                path: `${__dirname}/../assets/google.png`,
                cid: 'google',
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

    async sendUserProfileCompletionMail(email: string) {
        await this.mailerService.sendMail({
            to: this.adminMailAddress,
            subject: subjectConstant.PROFILE_REVIEWED_SUBJECT,
            template: './plain_message',
            attachments: this.attachments,
            context: {
                heading: `${email} has successfully completed user Profile`,
            },
        });
    }

    async jobApplicationUpdateEmailForMarketing(
        userEmail: string,
        title: string,
        companyName: string,
        location: string,
        url: string,
        status: string,
        jobId: string
    ) {
        await this.mailerService.sendMail({
            to: this.adminMailAddress,
            subject: `Job Recommendation: ${title} at ${companyName}`,
            template: './applied_table',
            attachments: [
                ...this.attachments,
                {
                    filename: 'location.png',
                    path: `${__dirname}/../assets/location.png`,
                    cid: 'location',
                },
            ],
            context: {
                heading: `${userEmail} application for ${title} is ${status} by ${companyName}`,
                title,
                companyName,
                location,
                url,
                jobUrl: `${process.env.CLIENT_URL}/jobs-details/${jobId}`,
            },
        });
    }
}
