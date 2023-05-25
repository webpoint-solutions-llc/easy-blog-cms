import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';
import { PaginationResponse } from '@particles/responseInterface/main';
import { IComment } from '@particles/responseInterface/comment/comment.list.interface';

export const getBlogComments = async (page: number, search: string, blogId: string) => {
  try {
    const { data } = await api.get<PaginationResponse<IComment[]>>(`/comment/comment.list/${blogId}`, {
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

export const useFetchComments = () => {
  const search = useGetParams('search') || '';
  const blogId = useGetParams('blogId') || '';

  const page = useCurrentPage();

  return useQuery({
    queryKey: ['comments.list', page, search, blogId],
    queryFn: () => getBlogComments(page, search, blogId),
  });
};

export default useFetchComments;
