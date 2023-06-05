import { IBlogContent } from './blogContent.interface';

export interface IBlog {
  content: IBlogContent;
  setContent: React.Dispatch<React.SetStateAction<IBlogContent>>;
}
