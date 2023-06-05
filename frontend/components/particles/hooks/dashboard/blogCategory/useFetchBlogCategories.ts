import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';
import { PaginationResponse } from '@particles/responseInterface/main';
import { IBlogCategory } from '@particles/responseInterface/blog-category/blog-category.list.interface';

export const getBlogCategories = async (page: number, search: string) => {
  try {
    const { data } = await api.get<PaginationResponse<IBlogCategory[]>>('/blog-category/blog-category.list', {
      params: {
        page,
        ...(search ? { search } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchBlogCategories = () => {
  const search = useGetParams('search') || '';
  const page = useCurrentPage();

  return useQuery({
    queryKey: ['blog-category.list', page, search],
    queryFn: () => getBlogCategories(page, search),
  });
};

export default useFetchBlogCategories;
