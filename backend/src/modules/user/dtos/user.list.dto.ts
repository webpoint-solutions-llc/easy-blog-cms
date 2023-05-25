import {
    USER_DEFAULT_AVAILABLE_SEARCH,
    USER_DEFAULT_AVAILABLE_SORT,
    USER_DEFAULT_PAGE,
    USER_DEFAULT_PER_PAGE,
    USER_DEFAULT_SORT,
} from '../constants/user.list.constant';
import {
    PaginationAvailableSearch,
    PaginationAvailableSort,
    PaginationPage,
    PaginationPerPage,
    PaginationSearch,
    PaginationSort,
} from '~/common/pagination/decorators/pagination.decorator';
import { IPaginationSort } from '~/common/pagination/pagination.interface';
import { LastLoginSearchGreaterThan } from '../decorators/user.lastlogin.decorator';
import { PaginationListAbstract } from '~/common/pagination/abstracts/pagination.abstract';
import {
    KeyValueSearchDecorator,
    KeyValueSearchRegexDecorator,
} from '~/common/decorators/search.decorator';

export class UserListDto implements PaginationListAbstract {
    @PaginationSearch(USER_DEFAULT_AVAILABLE_SEARCH)
    readonly search: Record<string, any>;

    @PaginationAvailableSearch(USER_DEFAULT_AVAILABLE_SEARCH)
    readonly availableSearch: string[];

    @PaginationPage(USER_DEFAULT_PAGE)
    readonly page: number;

    @PaginationPerPage(USER_DEFAULT_PER_PAGE)
    readonly perPage: number;

    @PaginationSort(USER_DEFAULT_SORT, USER_DEFAULT_AVAILABLE_SORT)
    readonly sort: IPaginationSort;

    @PaginationAvailableSort(USER_DEFAULT_AVAILABLE_SORT)
    readonly availableSort: string[];

    readonly content: string;

    readonly excludeWebPortalUser: boolean;

    @KeyValueSearchRegexDecorator()
    readonly fullName: Record<string, any>;

    @LastLoginSearchGreaterThan()
    readonly lastLogin: Record<string, any>;
}
