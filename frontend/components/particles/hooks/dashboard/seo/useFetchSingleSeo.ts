import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import api from '@particles/helper/api';

export const getSingleSeo = async (value: string) => {
  try {
    const { data } = await api.get(`/seo-template/${value}`);

    return data?.data;
  } catch (error) {
    return Promise.reject(error as AxiosError);
  }
};

export const useFetchSingleSeo = (value: string) => {
  return useQuery({
    queryKey: ['seo.single', value],
    queryFn: async () => await getSingleSeo(value),
  });
};

export default useFetchSingleSeo;
