import { NotFoundException } from '@nestjs/common';

export class BlogCategoryFoundException extends NotFoundException {
    constructor(error?: string) {
        super('blogCategory.error.notFound', error);
    }
}
