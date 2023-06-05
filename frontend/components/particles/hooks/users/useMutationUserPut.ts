import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { Error, Response } from '@particles/responseInterface/main';

export interface IUserProps {
  email?: string;
  fullName?: string;
}

export const editUser = async (values: IUserProps) => {
  try {
    const { data } = await api.put(`/admin/user/update`, values);

    return data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data?.errors || error);
  }
};

export const useMutationUserPut = () => {
  return useMutation({
    mutationFn: (values: IUserProps) => editUser(values),
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
    onError(error: AxiosError<Response<Error[]>>) {
      toast.error(error?.response?.data.message || 'Failed to edit User', {
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

export default useMutationUserPut;
