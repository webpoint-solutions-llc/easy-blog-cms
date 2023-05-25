import { useQuery } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import api from '@particles/helper/api';

import { Response } from '@particles/responseInterface/main';
import { ITicket } from '@particles/responseInterface/ticket/ticket.interface';

export const getSingleTicket = async (value: string) => {
  try {
    const { data } = await api.get<Response<ITicket>>(`/ticket/${value}`);

    return data?.data;
  } catch (error) {
    return Promise.reject(error as AxiosError);
  }
};

export const useFetchSingleTicket = (value: string) => {
  return useQuery({
    queryKey: ['ticket.single', value],
    queryFn: async () => await getSingleTicket(value),
  });
};

export default useFetchSingleTicket;
