import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { IUserId } from '@particles/responseInterface/user/user.id.interface';
import { ICompanyDetail, ICompanyGetRoot } from '@particles/responseInterface/company/comanyById.interface';

export const getCompanyById = async (id: string) => {
  try {
    const { data } = await api.get<ICompanyGetRoot>(`/companyProfiles/${id}`);

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useGetCompanyById = (id: string) =>
  useQuery({
    queryKey: ['user.list', id],
    queryFn: () => getCompanyById(id),
  });

export default useGetCompanyById;
