export interface IBlogContent {
  author?: string;
  hero: Hero;
  body: IBlogBody[];
  content?: IBlogBody[];
  cta: Cta;
  tags: string[];
  infographic?: MediaList;
  banner_image?: string;
  blog_uuid: string;
  published?: boolean;
  keyword: string;
  slug: string;
  isDeleted?: boolean;
  title: string;
  meta_description: string;
  categories: string[];
  updatedAt?: string;
  mediaList?: MediaList[];
}

export interface Hero {
  title: string;
  image?: MediaList | undefined;
  thumbnail?: MediaList | undefined;
}

export interface Image {
  path: string;
  pathWithFilename: string;
  filename: string;
  completedUrl: string;
  baseUrl: string;
  mime: string;
  originalFileName: string;
  createdDate: string;
  uploadedBy: string;
  alt: string;
  title: string;
  description: string;
  dimension: Dimension;
  size: number;
}

export interface Cta {
  employee?: EmployeeEmployer;
  employer?: EmployeeEmployer;
  newsLetter: boolean;
}

export interface EmployeeEmployer {
  link?: string;
  title?: string;
  subTitle?: string;
  image?: MediaList;
}

export interface MediaList {
  _id?: string;
  file?: File;
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

export interface IBlogBody {
  type: string;
  order: number;
  data: any;
}
