import { faker } from '@faker-js/faker';
import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CommonModule } from '~/common/common.module';
import { JobTypesService } from '~/modules/area_of_intrest/job-types/job-types.service';
import { RoutesModule } from '~/router/routes/routes.module';

describe('JobTypesService', () => {
    let jobTypesService: JobTypesService;
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
        jobTypesService = moduleRef.get<JobTypesService>(JobTypesService);
    });

    // afterAll(async () => {
    //     await jobTypesService.remove()
    // })

    it('should be defined', () => {
        expect(jobTypesService).toBeDefined();
    });
    describe('create', () => {
        it('should be called', async () => {
            const test = jest.spyOn(jobTypesService, 'create');

            const jobTypes = await jobTypesService.create({
                title: faker.name.jobType(),
            });
            expect(test).toHaveBeenCalledWith({
                title: jobTypes.title,
            });

            await jobTypesService.remove(jobTypes._id);
        });

        it('should be success', async () => {
            const result = await jobTypesService.create({
                title: faker.name.jobType(),
            });

            jest.spyOn(jobTypesService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await jobTypesService.create({
                    title: result.title,
                })
            ).toBe(result);

            await jobTypesService.remove(result._id);
        });

        it('should be success string', async () => {
            const result = await jobTypesService.create({
                title: faker.name.jobType(),
            });
            jest.spyOn(jobTypesService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await jobTypesService.create({
                    title: result.title,
                })
            ).toBe(result);

            await jobTypesService.remove(result._id);
        });
    });

    describe('findByIdAndUpdate', () => {
        it('should be called', async () => {
            const test = jest.spyOn(jobTypesService, 'update');

            const jobTypes = await jobTypesService.create({
                title: faker.name.jobType(),
            });
            const result = await jobTypesService.update(jobTypes._id, {
                title: faker.name.jobType(),
            });
            expect(test).toHaveBeenCalledWith(jobTypes._id, {
                title: result.title,
            });

            await jobTypesService.remove(jobTypes._id);
        });

        it('should be success', async () => {
            const jobTypes = await jobTypesService.create({
                title: faker.name.jobType(),
            });

            const result = await jobTypesService.update(jobTypes._id, {
                title: faker.name.jobType(),
            });
            jest.spyOn(jobTypesService, 'update').mockImplementation(
                async () => result
            );

            expect(
                await jobTypesService.update(jobTypes._id, {
                    title: faker.name.jobType(),
                })
            ).toBe(result);

            await jobTypesService.remove(jobTypes._id);
        });

        it('should be success string', async () => {
            const jobTypes = await jobTypesService.create({
                title: faker.name.jobType(),
            });

            const result = await jobTypesService.update(jobTypes._id, {
                title: faker.name.jobType(),
            });
            jest.spyOn(jobTypesService, 'update').mockImplementation(
                async () => result
            );

            expect(
                await jobTypesService.update(jobTypes._id, {
                    title: faker.name.jobType(),
                })
            ).toBe(result);

            await jobTypesService.remove(jobTypes._id);
        });
    });

    describe('delete', () => {
        it('should be called', async () => {
            const test = jest.spyOn(jobTypesService, 'remove');

            const jobTypes = await jobTypesService.create({
                title: faker.name.jobType(),
            });
            await jobTypesService.remove(jobTypes._id);
            expect(test).toHaveBeenCalledWith(jobTypes._id);
        });

        it('should be success', async () => {
            const jobTypes = await jobTypesService.create({
                title: faker.name.jobType(),
            });
            const result = await jobTypesService.remove(jobTypes._id);
            jest.spyOn(jobTypesService, 'remove').mockImplementation(
                async () => result
            );

            expect(await jobTypesService.remove(jobTypes._id)).toBe(result);

            await jobTypesService.remove(jobTypes._id);
        });
    });
    describe('findall', () => {
        it('should be called', async () => {
            const test = jest.spyOn(jobTypesService, 'findAll');
            await jobTypesService.findAll();
            expect(test).toHaveBeenCalledWith();
        });

        it('should be success', async () => {
            const result = await jobTypesService.findAll();
            jest.spyOn(jobTypesService, 'findAll').mockImplementation(
                async () => result
            );
            expect(await jobTypesService.findAll()).toBe(result);
        });
    });
});
