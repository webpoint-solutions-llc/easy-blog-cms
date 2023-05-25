export interface IBlogContentPost {
  blog_uuid: string;
  hero: Hero;
  cta: Cta;
  content: Content[];
  categories: string[];
  meta_description: string;
  keyword: string;
  title: string;
  tags: string[];
  mediaList: string[];
  published: boolean;
  slug: string;
  isDeleted?: boolean;
  infographic?: string;
  action?: string;
}

export interface Hero {
  title: string;
  image?: string;
  thumbnail?: string;
}

export interface Cta {
  employee: Employee;
  employer: Employer;
  newsLetter: boolean;
}

export interface Employee {
  image?: string;
}

export interface Employer {
  image?: string;
}

export interface Content {
  data: string;
  order: number;
  type: string;
}
