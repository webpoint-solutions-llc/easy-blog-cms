import moment from 'moment';
import { Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common/interfaces';

export function SearchFilterDateGtLtPipe(field): Type<PipeTransform> {
    @Injectable()
    class MixinSearchFilterGtLtPipe implements PipeTransform {
        async transform(value: any) {
            if (!value) return {};

            return {
                [field]: {
                    $gte: moment(JSON.parse(value).gt).startOf('day'),
                    $lt: moment(JSON.parse(value).lt).endOf('day'),
                },
            };
        }
    }

    return mixin(MixinSearchFilterGtLtPipe);
}
