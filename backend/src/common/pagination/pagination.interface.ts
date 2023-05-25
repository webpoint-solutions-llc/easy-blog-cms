import { PopulateOptions } from 'mongoose';
import { ENUM_PAGINATION_AVAILABLE_SORT_TYPE } from './constants/pagination.enum.constant';

export type IPaginationSort = Record<
    string,
    ENUM_PAGINATION_AVAILABLE_SORT_TYPE
>;

export interface IPaginationOptions {
    limit: number;
    skip: number;
    join?: PopulateOptions | PopulateOptions[];
    sort?: IPaginationSort;
    select?: string;
    withDeleted?: boolean;
}

export interface IPaginationFilterOptions {
    required?: boolean;
}

export interface IPaginationFilterDateOptions extends IPaginationFilterOptions {
    asEndDate?: {
        moreThanField: string;
    };
}

export interface IPaginationFilterStringOptions
    extends IPaginationFilterOptions {
    lowercase?: boolean;
}
