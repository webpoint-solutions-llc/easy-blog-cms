import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { Response } from '@particles/responseInterface/main';
import { skills } from '@particles/responseInterface/AOI/skills';

export const getSkillsList = async () => {
  try {
    const { data } = await api.get<Response<skills[]>>('/skills');

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchSkillsList = () =>
  useQuery({
    queryKey: ['user.list'],
    queryFn: () => getSkillsList(),
  });

export default useFetchSkillsList;
