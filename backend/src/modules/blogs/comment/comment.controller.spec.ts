import { RouterModule } from '@nestjs/core';
import { Test } from '@nestjs/testing';

import { CommonModule } from '~/common/common.module';
import { RoutesModule } from '~/router/routes/routes.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CreateStub } from './test/create-comment.stub';

describe('CommentController', () => {
    let controller: CommentController;
    let service: CommentService;

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
        controller = moduleRef.get<CommentController>(CommentController);
        service = moduleRef.get<CommentService>(CommentService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('Create Blog Category', () => {
        it('should create blog category', async () => {
            const data = await controller.create(CreateStub());
            expect(data.message).toEqual(CreateStub().message);
        });
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const result = ['test'];
            jest.spyOn(service, 'findAll').mockImplementation(
                () => result as any
            );

            expect(await controller.findAll()).toBe(result);
        });
    });
});
