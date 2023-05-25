import { CreateBlogCategoryDto } from '../dto/create-blog-category.dto';

export const UpdateBlogCategoryStub = (): CreateBlogCategoryDto => {
    return {
        name: 'arts',
        description: 'sdlfk',
        slug: '/sdlfka',
    };
};
