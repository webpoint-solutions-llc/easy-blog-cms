import { faker } from '@faker-js/faker';
import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CommonModule } from '~/common/common.module';
import { SkillsService } from '~/modules/area_of_intrest/skills/skills.service';
import { RoutesModule } from '~/router/routes/routes.module';

describe('SkillsService', () => {
    let skillsService: SkillsService;
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

        skillsService = moduleRef.get<SkillsService>(SkillsService);
    });

    it('should be defined', () => {
        expect(skillsService).toBeDefined();
    });
    describe('create', () => {
        it('should be called', async () => {
            const test = jest.spyOn(skillsService, 'create');

            const skills = await skillsService.create({
                title: faker.name.jobType(),
                isSystemGenerated: false,
            });
            expect(test).toHaveBeenCalledWith({
                title: skills.title,
                isSystemGenerated: false,
            });

            await skillsService.remove(skills._id);
        });

        it('should be success', async () => {
            const result = await skillsService.create({
                title: faker.name.jobType(),

                isSystemGenerated: false,
            });

            jest.spyOn(skillsService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await skillsService.create({
                    title: result.title,
                    isSystemGenerated: result.isSystemGenerated,
                })
            ).toBe(result);

            await skillsService.remove(result._id);
        });

        it('should be success string', async () => {
            const result = await skillsService.create({
                title: faker.name.jobType(),

                isSystemGenerated: false,
            });
            jest.spyOn(skillsService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await skillsService.create({
                    title: result.title,
                    isSystemGenerated: false,
                })
            ).toBe(result);

            await skillsService.remove(result._id);
        });
    });

    describe('findByIdAndUpdate', () => {
        it('should be called', async () => {
            const test = jest.spyOn(skillsService, 'update');

            const skills = await skillsService.create({
                title: faker.name.jobType(),
                isSystemGenerated: false,
            });
            await skillsService.update(skills._id, { isSystemGenerated: true });
            expect(test).toHaveBeenCalledWith(skills._id, {
                isSystemGenerated: true,
            });

            await skillsService.remove(skills._id);
        });

        it('should be success', async () => {
            const skills = await skillsService.create({
                title: faker.name.jobType(),
                isSystemGenerated: false,
            });

            const result = await skillsService.update(skills._id, {
                isSystemGenerated: true,
            });
            jest.spyOn(skillsService, 'update').mockImplementation(
                async () => result
            );

            expect(
                await skillsService.update(skills._id, {
                    isSystemGenerated: true,
                })
            ).toBe(result);

            await skillsService.remove(skills._id);
        });
    });

    describe('delete', () => {
        it('should be called', async () => {
            const test = jest.spyOn(skillsService, 'remove');

            const skills = await skillsService.create({
                title: faker.name.jobType(),
                isSystemGenerated: false,
            });
            await skillsService.remove(skills._id);
            expect(test).toHaveBeenCalledWith(skills._id);
        });

        it('should be success', async () => {
            const skills = await skillsService.create({
                title: faker.name.jobType(),
                isSystemGenerated: false,
            });
            const result = await skillsService.remove(skills._id);
            jest.spyOn(skillsService, 'remove').mockImplementation(
                async () => result
            );

            expect(await skillsService.remove(skills._id)).toBe(result);

            await skillsService.remove(skills._id);
        });
    });

    describe('findall', () => {
        it('should be called', async () => {
            const test = jest.spyOn(skillsService, 'findAll');
            await skillsService.findAll();
            expect(test).toHaveBeenCalledWith();
        });

        it('should be success', async () => {
            const result = await skillsService.findAll();
            jest.spyOn(skillsService, 'findAll').mockImplementation(
                async () => result
            );
            expect(await skillsService.findAll()).toBe(result);
        });
    });
});
