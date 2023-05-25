import {
    ValidationArguments,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import { Model } from 'mongoose';
import { DatabaseEntity } from '~/common/database/decorators/database.decorator';
import { SubscribeNewsletter } from '~/modules/blogs/subscribe-newsletter/entities/subscribe-newsletter.entity';

@ValidatorConstraint({ name: 'IsUniqueUser', async: true })
export class UniqueValidator implements ValidatorConstraintInterface {
    constructor(
        @DatabaseEntity(SubscribeNewsletter.name)
        private readonly subscribeModel: Model<SubscribeNewsletter>
    ) {}

    async validate(value: any, args: ValidationArguments) {
        const filter = {};

        filter[args.property] = value;
        const count = await this.subscribeModel.count(filter);
        return !count;
    }

    defaultMessage(args: ValidationArguments) {
        return '$(value) is already taken';
    }
}
