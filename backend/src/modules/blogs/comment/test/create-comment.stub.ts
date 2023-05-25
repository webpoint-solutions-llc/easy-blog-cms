import { CreateCommentDto } from '../dto/create-comment.dto';

export const CreateStub = (): CreateCommentDto => {
    return {
        message: 'hello',
        email: 'hari@gmail.com',
        website: 'www.sdfl.com',
        blog: '2334243',
        isDeleted: false,
        name: 'sdlfk',
        offensive: false,
    };
};
