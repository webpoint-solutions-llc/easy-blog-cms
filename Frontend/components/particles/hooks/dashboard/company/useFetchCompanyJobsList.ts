import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';

export const getCompanyJobsList = async (
  signal: AbortSignal | undefined,
  page: number,
  company: string,
  search: string,
  jobStatus: string,
) => {
  try {
    const { data } = await api.get('/companyJobs', {
      signal,
      params: {
        company,
        page,
        ...(search ? { search } : {}),
        ...(jobStatus ? { jobStatus } : {}),
      },
    });

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchCompanyJobsList = (page: number, company: string) => {
  const search = useGetParams('search') || '';
  let jobStatus = useGetParams('content') || '';

  if (jobStatus === 'all') jobStatus = '';
  else jobStatus === 'draft';

  return useQuery({
    queryKey: ['companyJobs.list', page, company, jobStatus, search],
    queryFn: ({ signal }) => getCompanyJobsList(signal, page, company, search, jobStatus),
  });
};

export default useFetchCompanyJobsList;
