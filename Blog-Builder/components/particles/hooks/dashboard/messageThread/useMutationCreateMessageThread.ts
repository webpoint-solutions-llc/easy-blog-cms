import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { convertJsonToFormData } from '@particles/helper/jsonToFormData';

export interface InputCreateMessageThread {
  message: string;
  value: string;
  refModel: string;
  file?: File[];
}

export type Iprops = {
  values: InputCreateMessageThread;
};

export const createMessageApi = async (values: InputCreateMessageThread) => {
  try {
    const { data } = await api.post(`/message-thread/upload`, convertJsonToFormData(values));

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationCreateMessageThread = () => {
  return useMutation({
    mutationFn: ({ values }: Iprops) => createMessageApi(values),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    },
    onError(error: AxiosError) {
      toast.error(error?.message || 'Failed to edit Ticket', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    },
  });
};

export default useMutationCreateMessageThread;
