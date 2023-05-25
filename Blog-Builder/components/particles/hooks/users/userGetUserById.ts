import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { PaginationResponse } from '@particles/responseInterface/main';
import { IUserId } from '@particles/responseInterface/user/user.id.interface';

export const getUserById = async (id: string) => {
  try {
    const { data } = await api.get<IUserId>(`/userProfiles/${id}`);

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useGetUserById = (id: string) =>
  useQuery({
    queryKey: ['user.list', id],
    queryFn: () => getUserById(id),
  });

export default useGetUserById;
