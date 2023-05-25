import {
    PaginationAvailableSearch,
    PaginationAvailableSort,
    PaginationPage,
    PaginationPerPage,
    PaginationSearch,
    PaginationSort,
} from '~/common/pagination/decorators/pagination.decorator';
import { IPaginationSort } from '~/common/pagination/pagination.interface';
import {
    DEFAULT_AVAILABLE_SEARCH,
    DEFAULT_AVAILABLE_SORT,
    DEFAULT_PAGE,
    DEFAULT_PER_PAGE,
    DEFAULT_SORT,
} from '../constants/seo-template.list.constant';
import { KeyValueSearchDecorator } from '~/common/decorators/search.decorator';
import { PaginationListAbstract } from '~/common/pagination/abstracts/pagination.abstract';

export class SeoTemplateListDto implements PaginationListAbstract {
    @PaginationSearch(DEFAULT_AVAILABLE_SEARCH)
    readonly search: Record<string, any>;

    @PaginationAvailableSearch(DEFAULT_AVAILABLE_SEARCH)
    readonly availableSearch: string[];

    @PaginationPage(DEFAULT_PAGE)
    readonly page: number;

    @PaginationPerPage(DEFAULT_PER_PAGE)
    readonly perPage: number;

    @PaginationSort(DEFAULT_SORT, DEFAULT_AVAILABLE_SORT)
    readonly sort: IPaginationSort;

    @PaginationAvailableSort(DEFAULT_AVAILABLE_SORT)
    readonly availableSort: string[];

    @KeyValueSearchDecorator()
    readonly pageType: Record<string, any>;
}
