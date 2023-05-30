import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { IJobById } from '@particles/responseInterface/company/jobById.interface';

export const getJobDetailsById = async (id: string) => {
  try {
    const { data } = await api.get<IJobById>(`/companyJobs/${id}`);

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useGetJobDetailsById = (id: string) =>
  useQuery({
    queryKey: ['job-details.id', id],
    queryFn: () => getJobDetailsById(id),
  });

export default useGetJobDetailsById;
