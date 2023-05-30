export interface IBlogCategory {
  _id: string;
  name: string;
  description: string;
  slug: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  count: number;
}
