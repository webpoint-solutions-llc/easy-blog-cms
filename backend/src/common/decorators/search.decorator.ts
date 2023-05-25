import { ObjectID } from 'bson';
import { Query } from '@nestjs/common';
import { IsOptional } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { Expose, Transform } from 'class-transformer';

import { SearchFilterInPipe } from '../pipes/search.filter-In.pipes';
import { SearchFilterGtLtPipe } from '../pipes/search.filter-gt-lt.pipes';
import { SearchFilterArrayInPipe } from '../pipes/search.filter-in-array.pipes';
import { SearchFilterDateGtLtPipe } from '../pipes/search.filter.date-gt-lt.pipes';

export function KeyValueSearchDecorator(column?: string) {
    return applyDecorators(
        Expose(),
        Transform(({ value, key }) => (value ? { [column || key]: value } : {}))
    );
}

export function KeyObjectValueSearchDecorator(column?: string) {
    return applyDecorators(
        Expose(),
        Transform(({ value, key }) =>
            value ? { [column || key]: new ObjectID(value) } : {}
        )
    );
}

export function KeyValueSearchRegexDecorator(column?: string): any {
    return applyDecorators(
        Expose(),
        IsOptional(),
        Transform(({ value, key }) =>
            value
                ? {
                      [key || column]: {
                          $regex: new RegExp(value),
                          $options: 'i',
                      },
                  }
                : undefined
        )
    );
}

// pipes
export function SearchFilterInDecorator(
    field: string,
    defaultValue?: any
): ParameterDecorator {
    return Query(field, SearchFilterInPipe(field));
}

export function SearchFilterArrayInDecorator(
    field,
    defaultValue?: any
): ParameterDecorator {
    return Query(field, SearchFilterArrayInPipe(field));
}

export function SearchFilterGtLtDecorator(field: string): ParameterDecorator {
    return Query(field, SearchFilterGtLtPipe(field));
}

export function SearchFilterDateGtLtDecorator(
    field: string
): ParameterDecorator {
    return Query(field, SearchFilterDateGtLtPipe(field));
}
