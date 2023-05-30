import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import api from '@particles/helper/api';

export const getSingleBlogCategory = async (value: string) => {
  try {
    const { data } = await api.get(`/blog-category/${value}`);

    return data.data;
  } catch (error) {
    return Promise.reject(error as AxiosError);
  }
};

export const useFetchSingleBlogCategory = (value: string) => {
  return useQuery({
    queryKey: ['blog-category.single', value],
    queryFn: async () => await getSingleBlogCategory(value),
  });
};

export default useFetchSingleBlogCategory;
