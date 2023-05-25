import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import api from '@particles/helper/api';
import { IBlogListUUID } from '@particles/responseInterface/blog/blog.list.uuid.interface';

export const getSingleBlog = async (value: string) => {
  try {
    const { data } = await api.get<IBlogListUUID>(`/blog/findByBlogUuid/${value}`);

    return data?.data;
  } catch (error) {
    return Promise.reject(error as AxiosError);
  }
};

export const useFetchSingleBlog = (value: string) => {
  return useQuery({
    queryKey: ['blog.single', value],
    queryFn: async () => await getSingleBlog(value),
    refetchOnWindowFocus: false,
  });
};

export default useFetchSingleBlog;
