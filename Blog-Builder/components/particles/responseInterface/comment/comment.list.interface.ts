export interface IComment {
  _id: string;
  message: string;
  blog: string;
  name: string;
  email: string;
  offensive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
