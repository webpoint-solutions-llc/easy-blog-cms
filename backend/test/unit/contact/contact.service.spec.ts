import { faker } from '@faker-js/faker';
import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CommonModule } from '~/common/common.module';
import { ContactService } from '~/modules/contact/contact.service';
import { RoutesModule } from '~/router/routes/routes.module';

describe('ContactService', () => {
    let contactService: ContactService;
    const _id = new Types.ObjectId();

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [
                RoutesModule,
                CommonModule,
                RouterModule.register([
                    {
                        path: '/',
                        module: RoutesModule,
                    },
                ]),
            ],
        }).compile();
        contactService = moduleRef.get<ContactService>(ContactService);
    });

    // afterAll(async () => {

    // })

    it('should be defined', () => {
        expect(contactService).toBeDefined();
    });
    describe('create', () => {
        it('should be called', async () => {
            const test = jest.spyOn(contactService, 'create');

            const contactInfo = await contactService.create({
                email: faker.internet.email(),
                companyName: faker.company.name(),
                fullName: faker.name.fullName(),
                message: faker.lorem.text(),
                number: parseInt(faker.phone.number('98########')),
            });
            expect(test).toHaveBeenCalledWith({
                email: contactInfo.email,
                companyName: contactInfo.companyName,
                fullName: contactInfo.fullName,
                message: contactInfo.message,
                number: contactInfo.number,
            });

            await contactService.remove(contactInfo._id);
        });

        it('should be success', async () => {
            const result = await contactService.create({
                email: faker.internet.email(),
                companyName: faker.company.name(),
                fullName: faker.name.fullName(),
                message: faker.lorem.text(),
                number: parseInt(faker.phone.number('98########')),
            });

            jest.spyOn(contactService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await contactService.create({
                    email: faker.internet.email(),
                    companyName: faker.company.name(),
                    fullName: faker.name.fullName(),
                    message: faker.lorem.text(),
                    number: parseInt(faker.phone.number('98########')),
                })
            ).toBe(result);

            await contactService.remove(result._id);
        });

        it('should be success string', async () => {
            const result = await contactService.create({
                email: faker.internet.email(),
                companyName: faker.company.name(),
                fullName: faker.name.fullName(),
                message: faker.lorem.text(),
                number: parseInt(faker.phone.number('98########')),
            });
            jest.spyOn(contactService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await contactService.create({
                    email: faker.internet.email(),
                    companyName: faker.company.name(),
                    fullName: faker.name.fullName(),
                    message: faker.lorem.text(),
                    number: parseInt(faker.phone.number('98########')),
                })
            ).toBe(result);

            await contactService.remove(result._id);
        });
    });

    describe('findall', () => {
        it('should be called', async () => {
            const test = jest.spyOn(contactService, 'findAll');
            await contactService.findAll();
            expect(test).toHaveBeenCalledWith();
        });

        it('should be success', async () => {
            const result = await contactService.findAll();
            jest.spyOn(contactService, 'findAll').mockImplementation(
                async () => result
            );
            expect(await contactService.findAll()).toBe(result);
        });
    });
});
