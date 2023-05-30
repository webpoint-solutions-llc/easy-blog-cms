export interface Response<T> {
  statusCode: number;
  message: string;
  metadata: Metadata;
  data: T;
}
export interface IErrorResponse {
  statusCode: number;
  message: string;
  errors: Error[];
}

export interface Error {
  property: string;
  message: string;
}

export interface Metadata {
  languages: string[];
  timestamp: number;
  timezone: string;
  requestId: string;
  path: string;
  version: string;
  repoVersion: string;
}

export interface PaginationResponse<T> {
  statusCode: number;
  message: string;
  totalData: number;
  totalPage: number;
  currentPage: number;
  perPage: number;
  availableSort: string[];
  availableSearch: string[];
  metadata: Metadata;
  data: T;
}

export interface Metadata {
  firstPage: string;
  lastPage: string;
  languages: string[];
  timestamp: number;
  timezone: string;
  requestId: string;
  path: string;
  version: string;
  repoVersion: string;
}

export interface Error {
  property: string;
  message: string;
}
