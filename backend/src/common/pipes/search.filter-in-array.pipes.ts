import { Injectable, mixin, Type } from '@nestjs/common';
import { PipeTransform } from '@nestjs/common/interfaces';
import { ObjectID } from 'bson';
export function SearchFilterArrayInPipe(field): Type<PipeTransform> {
    @Injectable()
    class MixinSearchFilterArrayInPipe implements PipeTransform {
        async transform(value: any) {
            if (!value) return {};

            const result = {};
            if (typeof value === 'string') value = JSON.parse(value);
            if (Array.isArray(value)) {
                const data = value.map((id) => new ObjectID(id));
                return { [field]: { $in: data } };
            }

            return result;
        }
    }

    return mixin(MixinSearchFilterArrayInPipe);
}
