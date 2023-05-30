import { useInfiniteQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';

export const useFetchInfiniteMediaList = () => {
  const search = useGetParams('search') || '';

  return useInfiniteQuery(
    ['media.list', search],
    async ({ pageParam = 1 }) => {
      const { data } = await api.get('/media/media.list', {
        params: {
          search: search,
          page: pageParam,
        },
      });
      return { ...data, nextPage: data.totalPage > pageParam };
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.totalPage;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    },
  );
};

export default useFetchInfiniteMediaList;
