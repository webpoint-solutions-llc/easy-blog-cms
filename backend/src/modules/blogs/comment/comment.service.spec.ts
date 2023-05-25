import { faker } from '@faker-js/faker';
import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CommonModule } from '~/common/common.module';
import { CommentService } from '~/modules/blogs/comment/comment.service';
import { RoutesModule } from '~/router/routes/routes.module';
import { ObjectID } from 'bson';

describe('BlogCategoryService', () => {
    let service: CommentService;
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
        service = moduleRef.get<CommentService>(CommentService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should be called', async () => {
            const test = jest.spyOn(service, 'create');

            const contactInfo = await service.create({
                message: faker.lorem.paragraph(1),
                email: faker.internet.email(),
                website: faker.company.name(),
                blog: '63e46317e97adc4dfc3180e3',
                isDeleted: false,
                offensive: false,
                name: 'sdlfk',
            });
            expect(test).toHaveBeenCalledWith({
                name: contactInfo.name,
            });

            // await service.remove(contactInfo._id);
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
