import { ObjectID } from 'bson';
import { Injectable, NotFoundException } from '@nestjs/common';
import { SeoTemplateRepository } from './seo-template.repository';
import { CreateSeoTemplateDto } from './dto/create-seo-template.dto';
import { UpdateSeoTemplateDto } from './dto/update-seo-template.dto';
import { IDatabaseFindAllOptions } from '~/common/database/database.interface';

@Injectable()
export class SeoTemplateService {
    constructor(private readonly seoTemplateRepo: SeoTemplateRepository) {}

    async create(createSeoTemplateDto: CreateSeoTemplateDto) {
        return await this.seoTemplateRepo.create(createSeoTemplateDto);
    }

    findAll(find?: Record<string, any>, options?: IDatabaseFindAllOptions) {
        return this.seoTemplateRepo.paginate(find, options);
    }

    async getTotal(find?: Record<string, any>): Promise<number> {
        return this.seoTemplateRepo.total(find);
    }

    async findOne(id: ObjectID) {
        const seoSetting = await this.seoTemplateRepo.findById(
            new ObjectID(id)
        );
        if (!seoSetting) {
            throw new NotFoundException('Seo Setting not found');
        }

        return seoSetting;
    }

    async update(id: ObjectID, updateSeoTemplateDto: UpdateSeoTemplateDto) {
        const _id = new ObjectID(id);

        return await this.seoTemplateRepo.findOneAndUpdate(
            {
                _id,
            },
            {
                $set: updateSeoTemplateDto,
            }
        );
    }

    async remove(id: ObjectID) {
        return await this.seoTemplateRepo.deleteOneById(id);
    }
}
