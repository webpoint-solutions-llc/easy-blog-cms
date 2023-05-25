import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';

import { IErrorResponse } from '@particles/responseInterface/main';

export interface IDeleteBlogProps {
  id: string;
  password: string;
  reason: string;
  deletePermanently?: boolean;
}

export const deleteUser = async ({ id, password, reason, deletePermanently }: IDeleteBlogProps) => {
  try {
    const { data } = await api.delete(`/admin/user/delete-with-password/${id}`, {
      data: {
        password,
        reason,
        deletePermanently,
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationDeleteUserWithPassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (deletePayload: IDeleteBlogProps) => await deleteUser(deletePayload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user.list'] });

      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    },
    onError(error: AxiosError<IErrorResponse>) {
      toast.error(error?.response?.data?.message || 'Failed to delete user', {
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

export default useMutationDeleteUserWithPassword;
