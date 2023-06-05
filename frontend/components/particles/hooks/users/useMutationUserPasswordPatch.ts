import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { Error, Response } from '@particles/responseInterface/main';

export interface IUserProps {
  newPassword: string;
  oldPassword?: string;
}

export const editUser = async (values: IUserProps) => {
  try {
    const { data } = await api.patch(`/user/change-password`, values);

    return data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data?.errors || error);
  }
};

export const useMutationUserPasswordPatch = () => {
  const navigate = useNavigate();

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
      toast.error(error?.response?.data.message || 'Something went wrong', {
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

export default useMutationUserPasswordPatch;
