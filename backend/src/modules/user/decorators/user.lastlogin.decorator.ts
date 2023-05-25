import moment from 'moment';
import { applyDecorators } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';
import { lastLogin } from '../constants/user.constant';

export function LastLoginSearchGreaterThan(): any {
    return applyDecorators(
        Expose(),
        Transform(({ value }) => {
            if (!value) return {};

            switch (value) {
                case lastLogin['Last 20min ago']:
                    value = moment().subtract(20, 'minutes').toDate();
                    break;

                case lastLogin['Last 1 hour ago']:
                    value = moment().subtract(1, 'hours').toDate();
                    break;

                case lastLogin['Last 24 hour ago']:
                    value = moment().subtract(24, 'hours').toDate();
                    break;

                default:
                    value = undefined;
                    break;
            }
            return value ? { updatedAt: { $gte: value } } : undefined;
        })
    );
}
