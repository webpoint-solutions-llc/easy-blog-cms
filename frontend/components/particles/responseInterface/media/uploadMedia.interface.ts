export interface IUploadMediaResponse {
  totalData: number;
  totalPage: number;
  currentPage: number;
  perPage: number;
  availableSearch: string[];
  availableSort: string[];
  data: IMediaFile[];
}

export interface IMediaResponse {
  statusCode: number;
  message: string;
  metadata: Metadata;
  data: IMediaFile;
}

interface Metadata {
  languages: string[];
  timestamp: number;
  timezone: string;
  requestId: string;
  path: string;
  version: string;
  repoVersion: string;
}

export interface IMediaFile {
  _id: string;
  file: File | Partial<File>;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface File {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
  createdDate: Date;
  uploadedBy: string;
  alt: string;
  title: string;
  seoCode: string;
  description: string;
  dimension: Dimension;
  size: number;
}

export interface Dimension {
  height: number;
  width: number;
}
