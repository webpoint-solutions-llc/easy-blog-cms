import { faker } from '@faker-js/faker';
import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CommonModule } from '~/common/common.module';
import { BlogCategoryService } from '~/modules/blog-category/blog-category.service';
import { RoutesModule } from '~/router/routes/routes.module';

describe('BlogCategoryService', () => {
    let service: BlogCategoryService;
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
        service = moduleRef.get<BlogCategoryService>(BlogCategoryService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('create', () => {
        it('should be called', async () => {
            const test = jest.spyOn(service, 'create');

            const contactInfo = await service.create({
                name: faker.lorem.text(),
            });
            expect(test).toHaveBeenCalledWith({
                name: contactInfo.name,
            });

            await service.remove(contactInfo._id);
        });

        it('should be success', async () => {
            const result = await service.create({
                name: faker.lorem.text(),
            });

            jest.spyOn(service, 'create').mockImplementation(
                async () => result
            );

            expect(
                await service.create({
                    name: faker.lorem.text(),
                })
            ).toBe(result);

            await service.remove(result._id);
        });

        it('should be success string', async () => {
            const result = await service.create({
                name: faker.lorem.text(),
            });
            jest.spyOn(service, 'create').mockImplementation(
                async () => result
            );

            expect(
                await service.create({
                    name: faker.lorem.text(),
                })
            ).toBe(result);

            await service.remove(result._id);
        });
    });

    describe('findall', () => {
        it('should be called', async () => {
            const test = jest.spyOn(service, 'findAll');
            await service.findAll();
            expect(test).toHaveBeenCalledWith();
        });

        it('should be success', async () => {
            const result = await service.findAll();
            jest.spyOn(service, 'findAll').mockImplementation(
                async () => result
            );
            expect(await service.findAll()).toBe(result);
        });
    });
});
