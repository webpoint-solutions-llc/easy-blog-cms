import { Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common/interfaces';

export function SearchFilterGtLtPipe(field): Type<PipeTransform> {
    @Injectable()
    class MixinSearchFilterGtLtPipe implements PipeTransform {
        async transform(value: any) {
            if (!value) return {};

            return {
                [field]: {
                    $gt: parseInt(JSON.parse(value).gt),
                    $lt: parseInt(JSON.parse(value).lt),
                },
            };
        }
    }

    return mixin(MixinSearchFilterGtLtPipe);
}
