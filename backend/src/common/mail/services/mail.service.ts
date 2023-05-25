import { subjectConstant } from '../const';
import { Injectable, Optional } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
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

    async sendUserConfirmation(email: string, user: string, url: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Talent Point! Please Confirm your Email',
            template: './confirmation_table',
            attachments: [
                ...this.attachments,
                {
                    filename: 'mail-open.png',
                    path: `${__dirname}/../assets/mail-open.png`,
                    cid: 'mail-open',
                },
            ],
            context: {
                name: user,
                url,
            },
        });
    }

    async sendMailToAdminAuthor(email: string, user: string, password: string) {
        const url = 'https://admin.talentpoint.io/';

        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Talent Point!',
            template: './send_credientials',
            attachments: [
                ...this.attachments,
                {
                    filename: 'mail-open.png',
                    path: `${__dirname}/../assets/mail-open.png`,
                    cid: 'mail-open',
                },
            ],
            context: {
                name: user,
                email,
                password,
                url,
            },
        });
    }

    async sendUserWelcomeMail(email: string) {
        const companyUrl =
            'https://np.talentpoint.io/company-dashboard/company-profile/company-edit';

        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Talent Point!',
            template: './welcome_message',
            attachments: this.attachments,
            context: {
                profileUrl: '',
            },
        });
    }

    async sendUserProfileCompletionMail(email: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: subjectConstant.PROFILE_REVIEWED_SUBJECT,
            template: './plain_message',
            attachments: this.attachments,
            context: {
                heading:
                    'Thank you for your effort to complete the profile. We appreciate your interest in joining our team. We are currently reviewing your profile and will contact you soon. ',
            },
        });
    }

    async sendResetPasswordEmail(email: string, url: string, user: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: subjectConstant.RESETPASSOWRD_SUBJECT,
            template: './password_table',
            attachments: this.attachments,
            context: {
                name: user,
                url,
            },
        });
    }

    async jobApplicationToCompanySendEmail(
        email: string,
        title: string,
        companyName: string,
        location: string,
        url: string,
        jobId: string
    ) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'New job application has been arrived',
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
                heading: `New application for ${title} has arrived`,
                title,
                companyName,
                location,
                url,
                jobUrl: `${process.env.CLIENT_URL}/jobs-details/${jobId}`,
            },
        });
    }

    async jobApplicationUpdateEmail(
        email: string,
        title: string,
        companyName: string,
        location: string,
        url: string,
        status: string,
        jobId: string
    ) {
        await this.mailerService.sendMail({
            to: email,
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
                heading: `Your application for ${title} is ${status} by ${companyName}`,
                title,
                companyName,
                location,
                url,
                jobUrl: `${process.env.CLIENT_URL}/jobs-details/${jobId}`,
            },
        });
    }

    async sendEmployeeConfirmation(email: string, name: string) {
        await this.mailerService.sendMail({
            to: email,
            from: `${process.env.MAIL_FROM_PREFIX} <${process.env.MAIL_USER}>`,
            subject: subjectConstant.EMPLOYEE_SUBJECT,
            template: './confirm_employee.hbs',
            context: {
                name,
            },
        });
    }

    async sendEmailToHr(
        email: string,
        name: string,
        city: string,
        skills: string,
        currentRole: string,
        linkedinProfile: string,
        intrestedJobType: string,
        jobSearchStatus: string,
        desiredSalary: number,
        roleLookingFor: string,
        cvUrl: string
    ) {
        await this.mailerService.sendMail({
            to: process.env.HR_EMAIL,
            from: `${process.env.MAIL_FROM_PREFIX} <${process.env.MAIL_USER}>`,
            subject: subjectConstant.HR_SUBJECT,
            template: './hr_unit.hbs',
            context: {
                email,
                fullname: name,
                city,
                skills,
                currentRole,
                linkedinProfile,
                intrestedJobType,
                jobSearchStatus,
                desiredSalary,
                roleLookingFor,
                cvUrl,
            },
        });
    }

    async sendEmailToEmployer(email: string, name: string, callTime: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: subjectConstant.EMPLOYER_SUBJECT,
            from: `${process.env.MAIL_FROM_PREFIX} <${process.env.INFO_EMAIL}>`,
            template: './confirm_employer.hbs',
            context: {
                name,
                callTime,
            },
        });
    }
    async sendEmailToSales(
        companyName: string,
        email: string,
        name: string,
        roleWantToHire: string,
        numberOfEmployee: string,
        typeOfProject: string,
        roleType: string,
        gettingStarted: string,
        openToRemoteWork: string,
        roleLevel: string,
        budget: string,
        callTime: string
    ) {
        await this.mailerService.sendMail({
            to: process.env.SALES_EMAIL,
            from: `${process.env.MAIL_FROM_PREFIX} <${process.env.MAIL_USER}>`,
            subject: subjectConstant.SALES_SUBJECT,
            template: './sales_unit.hbs',
            context: {
                companyName,
                email: email,
                fullname: name,
                roleWantToHire,
                numberOfEmployee,
                typeOfProject,
                roleType,
                gettingStarted,
                openToRemoteWork,
                roleLevel,
                budget,
                callTime,
            },
        });
    }
}
