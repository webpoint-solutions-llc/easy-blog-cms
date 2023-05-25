import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { BlogService } from '../blog.service';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { Blog, BlogDocument } from '../entities/blog.entity';
import { Model } from 'mongoose';

@ValidatorConstraint({ async: true })
export class IsUserAlreadyExistConstraint
    implements ValidatorConstraintInterface
{
    constructor(
        @DatabaseEntity(Blog.name)
        private readonly blogModel: Model<BlogDocument>
    ) {}

    validate(value: any, args: ValidationArguments) {
        return this.blogModel.findOne({ title: value }).then((user) => {
            if (user) return false;
            return true;
        });
    }
}
