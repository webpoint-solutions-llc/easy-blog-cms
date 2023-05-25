import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { IUserCurrent } from '@particles/responseInterface/user/user.current.interface';

export const getUserById = async () => {
  try {
    const { data } = await api.get<IUserCurrent>(`/user/profile`);

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useUserGetCurrentUser = () =>
  useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['user.current'],
    queryFn: () => getUserById(),
  });

export default useUserGetCurrentUser;
