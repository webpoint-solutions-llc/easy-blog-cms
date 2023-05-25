import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';

export const postRecommendation = async (page: number, search: string, jobTypes: string) => {
  try {
    const { data } = await api.get('/userProfiles/userProfiles.list', {
      params: {
        page,
        ...(search ? { search } : {}),
        ...(jobTypes ? { jobTypes } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationRecommend = () => {
  const search = useGetParams('search') || '';
  const jobTypes = useGetParams('jobType') || '';
  const page = useCurrentPage();

  return useQuery({
    queryKey: ['vetted.list', page, search, jobTypes],
    queryFn: () => postRecommendation(page, search, jobTypes),
  });
};

export default useMutationRecommend;
