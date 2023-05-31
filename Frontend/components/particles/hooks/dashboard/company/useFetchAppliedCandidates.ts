import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';

export const getCompanyJobsApplicantsList = async (jobId: string) => {
  try {
    const { data } = await api.get(`/applications/${jobId}`);

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getRecommended = async (
  signal: AbortSignal | undefined,
  page: number,
  search: string,
  job: string,
  isVetted: boolean,
) => {
  try {
    const { data } = await api.get('/userProfiles/userProfiles.recommended', {
      signal,
      params: {
        page,
        ...(search ? { search } : {}),
        ...(job ? { job } : {}),
        ...(isVetted ? { isVetted } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchCompanyJobsAppliedList = (jobId: string) => {
  const search = useGetParams('search') || '';
  const job = useGetParams('jobId') || '';
  const page = useCurrentPage();
  const content = useGetParams('content');

  let isVetted = true;

  if (content === 'all') {
    isVetted = false;
  }

  // swith recommendataino and vetted list
  if (content === 'recommended')
    return useQuery({
      queryKey: ['companyJobsApplicants.list', jobId],
      queryFn: () => getCompanyJobsApplicantsList(jobId),
    });
  else
    return useQuery({
      queryKey: ['vetted.list', page, search, job, isVetted],
      queryFn: ({ signal }) => getRecommended(signal, page, search, job, isVetted),
    });
};

export default useFetchCompanyJobsAppliedList;
