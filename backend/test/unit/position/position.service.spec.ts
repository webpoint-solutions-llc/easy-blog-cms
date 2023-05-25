import { faker } from '@faker-js/faker';
import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CommonModule } from '~/common/common.module';
import { PositionService } from '~/modules/area_of_intrest/position/position.service';
import { RoutesModule } from '~/router/routes/routes.module';

describe('PositionService', () => {
    let positionService: PositionService;
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
        positionService = moduleRef.get<PositionService>(PositionService);
    });

    it('should be defined', () => {
        expect(positionService).toBeDefined();
    });
    describe('create', () => {
        it('should be called', async () => {
            const test = jest.spyOn(positionService, 'create');

            const position = await positionService.create({
                title: faker.name.jobDescriptor(),
            });
            expect(test).toHaveBeenCalledWith({
                title: position.title,
            });

            await positionService.remove(position._id);
        });

        it('should be success', async () => {
            const result = await positionService.create({
                title: faker.name.jobDescriptor(),
            });

            jest.spyOn(positionService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await positionService.create({
                    title: result.title,
                })
            ).toBe(result);

            await positionService.remove(result._id);
        });

        it('should be success string', async () => {
            const result = await positionService.create({
                title: faker.name.jobDescriptor(),
            });
            jest.spyOn(positionService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await positionService.create({
                    title: result.title,
                })
            ).toBe(result);

            await positionService.remove(result._id);
        });
    });

    describe('findByIdAndUpdate', () => {
        it('should be called', async () => {
            const test = jest.spyOn(positionService, 'update');

            const position = await positionService.create({
                title: 'php',
            });
            await positionService.update(position._id, { title: 'python' });
            expect(test).toHaveBeenCalledWith(position._id, {
                title: 'python',
            });

            await positionService.remove(position._id);
        });

        it('should be success', async () => {
            const position = await positionService.create({
                title: 'php',
            });

            const result = await positionService.update(position._id, {
                title: 'java',
            });
            jest.spyOn(positionService, 'update').mockImplementation(
                async () => result
            );

            expect(
                await positionService.update(position._id, {
                    title: 'java',
                })
            ).toBe(result);

            await positionService.remove(position._id);
        });

        it('should be success string', async () => {
            const position = await positionService.create({
                title: 'sql',
            });

            const result = await positionService.update(position._id, {
                title: 'sql',
            });
            jest.spyOn(positionService, 'update').mockImplementation(
                async () => result
            );

            expect(
                await positionService.update(position._id, {
                    title: 'sql',
                })
            ).toBe(result);

            await positionService.remove(position._id);
        });
    });

    describe('delete', () => {
        it('should be called', async () => {
            const test = jest.spyOn(positionService, 'remove');

            const position = await positionService.create({
                title: faker.name.jobDescriptor(),
            });
            await positionService.remove(position._id);
            expect(test).toHaveBeenCalledWith(position._id);
        });

        it('should be success', async () => {
            const position = await positionService.create({
                title: faker.name.jobDescriptor(),
            });
            const result = await positionService.remove(position._id);
            jest.spyOn(positionService, 'remove').mockImplementation(
                async () => result
            );

            expect(await positionService.remove(position._id)).toBe(result);

            await positionService.remove(position._id);
        });
    });
    describe('findall', () => {
        it('should be called', async () => {
            const test = jest.spyOn(positionService, 'findAll');
            await positionService.findAll();
            expect(test).toHaveBeenCalledWith();
        });

        it('should be success', async () => {
            const result = await positionService.findAll();
            jest.spyOn(positionService, 'findAll').mockImplementation(
                async () => result
            );
            expect(await positionService.findAll()).toBe(result);
        });
    });
});
