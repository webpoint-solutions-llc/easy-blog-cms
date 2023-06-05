import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';

export const getVettedList = async (
  signal: AbortSignal | undefined,
  page: number,
  search: string,
  jobTypes: string,
  isVetted: boolean,
) => {
  try {
    const { data } = await api.get('/userProfiles/userProfiles.list', {
      signal,
      params: {
        page,
        ...(search ? { search } : {}),
        ...(jobTypes ? { jobTypes } : {}),
        ...(isVetted ? { isVetted } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchVettedList = () => {
  const search = useGetParams('search') || '';
  const jobTypes = useGetParams('jobType') || '';
  const page = useCurrentPage();
  const content = useGetParams('content') || '';

  let isVetted = false;

  if (content === 'vetted candidates') isVetted = true;

  return useQuery({
    queryKey: ['vetted.list', page, search, jobTypes, isVetted],
    queryFn: ({ signal }) => getVettedList(signal, page, search, jobTypes, isVetted),
  });
};

export default useFetchVettedList;
