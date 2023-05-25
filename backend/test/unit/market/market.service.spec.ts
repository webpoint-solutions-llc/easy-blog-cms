import { faker } from '@faker-js/faker';
import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CommonModule } from '~/common/common.module';
import { MarketsService } from '~/modules/area_of_intrest/markets/markets.service';
import { RoutesModule } from '~/router/routes/routes.module';

describe('JobTypesService', () => {
    let marketService: MarketsService;
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
        marketService = moduleRef.get<MarketsService>(MarketsService);
    });

    // afterAll(async () => {

    // })

    it('should be defined', () => {
        expect(marketService).toBeDefined();
    });
    describe('create', () => {
        it('should be called', async () => {
            const test = jest.spyOn(marketService, 'create');

            const market = await marketService.create({
                title: faker.name.jobArea(),
            });
            expect(test).toHaveBeenCalledWith({
                title: market.title,
            });

            await marketService.remove(market._id);
        });

        it('should be success', async () => {
            const result = await marketService.create({
                title: faker.name.jobArea(),
            });

            jest.spyOn(marketService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await marketService.create({
                    title: result.title,
                })
            ).toBe(result);

            await marketService.remove(result._id);
        });

        it('should be success string', async () => {
            const result = await marketService.create({
                title: faker.name.jobArea(),
            });
            jest.spyOn(marketService, 'create').mockImplementation(
                async () => result
            );

            expect(
                await marketService.create({
                    title: result.title,
                })
            ).toBe(result);

            await marketService.remove(result._id);
        });
    });

    describe('findall', () => {
        it('should be called', async () => {
            const test = jest.spyOn(marketService, 'findAll');
            await marketService.findAll();
            expect(test).toHaveBeenCalledWith();
        });

        it('should be success', async () => {
            const result = await marketService.findAll();
            jest.spyOn(marketService, 'findAll').mockImplementation(
                async () => result
            );
            expect(await marketService.findAll()).toBe(result);
        });
    });
});
