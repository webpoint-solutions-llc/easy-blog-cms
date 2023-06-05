import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import api from '@particles/helper/api';
import { IMediaResponse } from '@particles/responseInterface/media/uploadMedia.interface';

export const getSingleMeida = async (value: string) => {
  try {
    const { data } = await api.get<IMediaResponse>(`/media/${value}`);

    return data?.data;
  } catch (error) {
    return Promise.reject(error as AxiosError);
  }
};

export const useFetchSingleMedia = (value: string) => {
  return useQuery({
    queryKey: ['media.single', value],
    queryFn: async () => await getSingleMeida(value),
    refetchOnWindowFocus: false,
  });
};

export default useFetchSingleMedia;
