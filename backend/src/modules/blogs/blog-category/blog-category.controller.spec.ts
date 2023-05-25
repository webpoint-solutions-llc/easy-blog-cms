import { Test, TestingModule } from '@nestjs/testing';
import { BlogCategoryController } from './blog-category.controller';
import { BlogCategoryService } from './blog-category.service';
import { CreateBlogCategoryDto } from './dto/create-blog-category.dto';
import { RoutesModule } from '~/router/routes/routes.module';
import { CommonModule } from '~/common/common.module';
import { RouterModule } from '@nestjs/core';
import { CreateBlogCategoryStub } from './test/create-blog-category.stub';

describe('BlogCategoryController', () => {
    let controller: BlogCategoryController;
    let service: BlogCategoryService;

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
        controller = moduleRef.get<BlogCategoryController>(
            BlogCategoryController
        );
        service = moduleRef.get<BlogCategoryService>(BlogCategoryService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('Create Blog Category', () => {
        it('should create blog category', async () => {
            const data = await controller.create(CreateBlogCategoryStub());
            expect(data.name).toEqual(CreateBlogCategoryStub().name);
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
