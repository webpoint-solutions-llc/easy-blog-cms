import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';

export const getRecommended = async (signal: AbortSignal | undefined, page: number, search: string, job: string) => {
  try {
    const { data } = await api.get('/userProfiles/userProfiles.recommended', {
      signal,
      params: {
        page,
        ...(search ? { search } : {}),
        ...(job ? { job } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchRecommended = () => {
  const search = useGetParams('search') || '';
  const job = useGetParams('jobId') || '';
  const page = useCurrentPage();

  return useQuery({
    queryKey: ['vetted.list', page, search, job],
    queryFn: ({ signal }) => getRecommended(signal, page, search, job),
  });
};

export default useFetchRecommended;
