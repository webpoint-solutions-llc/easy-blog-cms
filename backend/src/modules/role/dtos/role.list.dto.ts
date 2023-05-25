import { PaginationListAbstract } from '~/common/pagination/abstracts/pagination.abstract';
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
    ROLE_DEFAULT_AVAILABLE_SEARCH,
    ROLE_DEFAULT_AVAILABLE_SORT,
    ROLE_DEFAULT_PAGE,
    ROLE_DEFAULT_PER_PAGE,
    ROLE_DEFAULT_SORT,
} from '../constants/role.list.constant';

export class RoleListDto implements PaginationListAbstract {
    @PaginationSearch(ROLE_DEFAULT_AVAILABLE_SEARCH)
    readonly search: Record<string, any>;

    @PaginationAvailableSearch(ROLE_DEFAULT_AVAILABLE_SEARCH)
    readonly availableSearch: string[];

    @PaginationPage(ROLE_DEFAULT_PAGE)
    readonly page: number;

    @PaginationPerPage(ROLE_DEFAULT_PER_PAGE)
    readonly perPage: number;

    @PaginationSort(ROLE_DEFAULT_SORT, ROLE_DEFAULT_AVAILABLE_SORT)
    readonly sort: IPaginationSort;

    @PaginationAvailableSort(ROLE_DEFAULT_AVAILABLE_SORT)
    readonly availableSort: string[];
}
