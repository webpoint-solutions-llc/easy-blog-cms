import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { Response } from '@particles/responseInterface/main';
import { IBlogCategory } from '@particles/responseInterface/blog-category/blog-category.list.interface';

export const getBlogCategories = async () => {
  try {
    const { data } = await api.get<Response<IBlogCategory[]>>('/blog-category/blog-category.list', {});

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchAllBlogCategories = () => {
  return useQuery({
    queryKey: ['blog-category.all'],
    queryFn: () => getBlogCategories(),
  });
};

export default useFetchAllBlogCategories;
