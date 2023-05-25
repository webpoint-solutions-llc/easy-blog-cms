import mongoose from 'mongoose';
import { join } from 'path';
import { URL } from 'url';

export const urlJoin = (url = '', path = '') => {
    if (!url) {
        return path;
    }

    const newURL = new URL(url);
    newURL.pathname = join(path);

    return newURL.toString();
};

export const isValidObjectId = (id) => {
    const ObjectId = mongoose.Types.ObjectId;

    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) == id) return true;
        return false;
    }

    return false;
};

import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidateObjectId implements PipeTransform<string> {
    async transform(value: string, metadata: ArgumentMetadata) {
        const isValid = mongoose.Types.ObjectId.isValid(value);
        if (!isValid) throw new BadRequestException('Invalid ID!');
        return value;
    }
}
