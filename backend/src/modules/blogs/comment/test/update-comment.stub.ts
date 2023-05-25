import { UpdateCommentDto } from '../dto/update-comment.dto';

export const UpdateBlogCategoryStub = (): UpdateCommentDto => {
    return {
        message: 'hi',
        email: 'rame@gmail.com',
        website: 'www.ssddfl.com',
        blog: 'sdaas',
        isDeleted: false,
        name: 'sdlfk',
        offensive: false,
    };
};
