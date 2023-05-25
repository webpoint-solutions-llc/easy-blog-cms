import { Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common/interfaces';

export function SearchFilterInPipe(field): Type<PipeTransform> {
    @Injectable()
    class MixinSearchFilterInPipe implements PipeTransform {
        async transform(value: any) {
            if (!value) return {};

            return {
                [field]: { $in: value },
            };
        }
    }

    return mixin(MixinSearchFilterInPipe);
}
