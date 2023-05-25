import { CreateBlogCategoryDto } from '../dto/create-blog-category.dto';

export const CreateBlogCategoryStub = (): CreateBlogCategoryDto => {
    return {
        name: 'tech',
        description: 'sdlfk',
        slug: '/sdlfka',
    };
};
