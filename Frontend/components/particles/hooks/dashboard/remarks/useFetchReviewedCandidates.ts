import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';

import { PaginationResponse } from '@particles/responseInterface/main';
import { RecommendedUser } from '@particles/responseInterface/remarks/remarks.interface';

interface IProps {
  page: number;
  search: string;
  job: string;
  listRemarks?: boolean;
}

export const getReviewedCandidateList = async ({ page, job, search }: IProps) => {
  try {
    const { data } = await api.get<PaginationResponse<RecommendedUser[]>>('/applications/applications.list/remarks', {
      params: {
        page,
        isVetted: true,
        ...(search ? { search } : {}),
        ...(job ? { job } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchReviewedCandidates = () => {
  const search = useGetParams('search') || '';
  const job = useGetParams('job') || '';
  const page = useCurrentPage();

  return useQuery({
    queryKey: ['reviewed-candidates.all', page, search, job],
    queryFn: () => getReviewedCandidateList({ page, search, job }),
  });
};

export default useFetchReviewedCandidates;
