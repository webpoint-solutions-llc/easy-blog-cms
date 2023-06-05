import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';
import { useNavigate } from 'react-router-dom';
import { Error, Response } from '@particles/responseInterface/main';

export type IUserProps = {
  email: string;
  password: string;
  fullName: string;
};

export const postUser = async (values: IUserProps) => {
  try {
    const { data } = await api.post(`/admin/user/create`, values);

    return data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data?.errors || error);
  }
};

export const useMutationUserPost = () => {
  return useMutation({
    mutationFn: (values: IUserProps) => postUser(values),
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
      toast.error(error?.response?.data.message || 'Failed to create User', {
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

export default useMutationUserPost;
