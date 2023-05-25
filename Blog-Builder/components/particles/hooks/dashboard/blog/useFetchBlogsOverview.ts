import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import { IBlogOverviewResponse } from '@particles/responseInterface/blog/blogs.overview.interface';

export const getBlogsOverview = async (from: string, to: string) => {
  try {
    const { data } = await api.get('/blog/blog.overview', {
      params: {
        from,
        to,
      },
    });

    return data.data as IBlogOverviewResponse;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchBlogsOverview = () => {
  const from = useGetParams('from') || '';
  const to = useGetParams('to') || '';

  return useQuery({
    queryKey: ['blogs.overview', from, to],
    queryFn: () => getBlogsOverview(from, to),
  });
};

export default useFetchBlogsOverview;
