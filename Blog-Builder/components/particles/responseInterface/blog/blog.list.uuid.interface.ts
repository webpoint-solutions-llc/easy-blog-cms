export interface IBlogListUUID {
  statusCode: number;
  message: string;
  metadata: Metadata;
  data: Data;
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

export interface Data {
  _id: string;
  blog_uuid: string;
  hero: Hero;
  cta: Cta;
  content: Content[];
  author: Author;
  seoSetting: SeoSetting;
  count: number;
  published: boolean;
  lastPublishedDate: string;
  isDeleted: boolean;
  mediaList: MediaList[];
  updatedAt: string;
  createdAt: string;
  infographic: string;
}

export interface Hero {
  title: string;
  image: string;
  thumbnail: string;
  _id: string;
}

export interface Cta {
  employer?: Employer;
  employee?: Employee;
  newsLetter: boolean;
  _id: string;
}

export interface Employer {
  image: string;
}
export interface Employee {
  image: string;
}

export interface Content {
  order: number;
  type: string;
  data: string;
}

export interface Author {
  _id: string;
  fullName: string;
  email: string;
}

export interface SeoSetting {
  _id: string;
  title: string;
  author: string[];
  tags: Tag[];
  categories: Category[];
  meta_description: string;
  keyword: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MediaList {
  _id: string;
  file: File;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface File {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
  createdDate: string;
  uploadedBy: string;
  dimension: Dimension;
  size: number;
}

export interface Dimension {
  height: number;
  width: number;
}
