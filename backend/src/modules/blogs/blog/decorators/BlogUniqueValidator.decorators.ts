import { getModelToken, InjectModel } from '@nestjs/mongoose';
import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { Blog } from '../entities/blog.entity';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';

@ValidatorConstraint({ name: 'IsUniqueUser', async: true })
export class BlogUniqueValidator implements ValidatorConstraintInterface {
    constructor(
        @DatabaseEntity(Blog.name)
        private readonly blogModel: Model<Blog>
    ) {}

    async validate(value: any, args: ValidationArguments) {
        const filter = {};

        filter[args.property] = value;
        const count = await this.blogModel.count(filter);
        return !count;
    }

    defaultMessage(args: ValidationArguments) {
        return '$(value) is already taken';
    }
}
