import { Model } from 'mongoose';
import {
    SubscribeNewsletterApiDocument,
    SubscribeNewsletter,
} from './entities/subscribe-newsletter.entity';
import {
    Injectable,
    InternalServerErrorException,
    PreconditionFailedException,
} from '@nestjs/common';
import { SubscribeNewsletterConst } from './subscribe-newsletter.constant';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { CompanyMailService } from '~/common/mail/services/company.mail.service';
import { CreateSubscribeNewsletterDto } from './dto/create-subscribe-newsletter.dto';
import { UpdateSubscribeNewsletterDto } from './dto/update-subscribe-newsletter.dto';
import { CandidateMailService } from '~/common/mail/services/candidate.mail.service';

@Injectable()
export class SubscribeNewsletterService {
    constructor(
        @DatabaseEntity(SubscribeNewsletter.name)
        private readonly subscribeNewsModel: Model<SubscribeNewsletterApiDocument>,
        private readonly companyMailService: CompanyMailService,
        private readonly candidateMailService: CandidateMailService
    ) {}

    async create(createSubscribeNewsletterDto: CreateSubscribeNewsletterDto) {
        // find user is company or candidate
        let hasCandidateOrCompany = {};
        if (
            createSubscribeNewsletterDto.type ===
            SubscribeNewsletterConst.CANDIDATE
        )
            hasCandidateOrCompany = {
                ...hasCandidateOrCompany,
                isCandidate: true,
            };
        else
            hasCandidateOrCompany = {
                ...hasCandidateOrCompany,
                isCompany: true,
            };

        const user = await this.subscribeNewsModel.findOne({
            email: createSubscribeNewsletterDto.email,
            ...hasCandidateOrCompany,
        });

        if (user) {
            throw new PreconditionFailedException(
                'Already subscribed to newsletter'
            );
        }

        // escaple validation for duplicate error
        try {
            await this.subscribeNewsModel.create({
                ...createSubscribeNewsletterDto,
                ...hasCandidateOrCompany,
            });
        } catch (err) {
            if (err?.code === 11000) {
                await this.subscribeNewsModel.updateOne(
                    { email: createSubscribeNewsletterDto.email },
                    hasCandidateOrCompany,
                    {
                        useFindAndModify: false,
                        new: true,
                    }
                );
            } else throw new InternalServerErrorException(err);
        }

        // send mail to compnay or candidate
        if (
            createSubscribeNewsletterDto.type ==
            SubscribeNewsletterConst.COMPANY
        )
            this.companyMailService.sendNewsletterEmail(
                createSubscribeNewsletterDto.email
            );
        else
            this.candidateMailService.sendNewsletterEmail(
                createSubscribeNewsletterDto.email
            );
    }

    findAll() {
        return `This action returns all subscribeNewsletter`;
    }

    findOne(id: number) {
        return `This action returns a #${id} subscribeNewsletter`;
    }

    update(
        id: number,
        updateSubscribeNewsletterDto: UpdateSubscribeNewsletterDto
    ) {
        return `This action updates a #${id} subscribeNewsletter`;
    }

    remove(id: number) {
        return `This action removes a #${id} subscribeNewsletter`;
    }
}
