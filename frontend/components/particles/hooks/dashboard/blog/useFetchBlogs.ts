import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';

type IFilterValue = {
  gt: number | string;
  lt: number | string;
};

export const getBlogs = async (
  page: number,
  search: string,
  content: string,
  keyword: string,
  author: string,
  blogCategory: string,
  createdAt: IFilterValue | string | undefined,
) => {
  try {
    const { data } = await api.get('/blog/blog.list', {
      params: {
        page,
        ...(author ? { author } : {}),
        ...(search ? { search } : {}),
        ...(content ? { content } : {}),
        ...(keyword ? { keyword } : {}),
        ...(blogCategory ? { blogCategory } : {}),
        ...(createdAt ? { createdAt: JSON.stringify(createdAt) } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchBlogs = () => {
  const search = useGetParams('search') || '';
  const author = useGetParams('author') || '';
  const content = useGetParams('content') || '';
  const keyword = useGetParams('keyword') || '';
  const createdAt = useGetParams('createdAt') || '';
  const blogCategory = useGetParams('blogCategory') || '';

  const page = useCurrentPage();

  return useQuery({
    queryKey: ['blogs.list', page, search, content],
    queryFn: () => getBlogs(page, search, content, keyword, author, blogCategory, createdAt),
  });
};

export default useFetchBlogs;
