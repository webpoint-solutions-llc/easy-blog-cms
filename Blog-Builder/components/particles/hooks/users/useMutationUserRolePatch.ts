import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { Response } from '@particles/responseInterface/main';

export interface IUserRoleProps {
  role: string;
  _id: string;
}

export const patchUserRole = async (values: IUserRoleProps) => {
  try {
    const { data } = await api.put(`/admin/user/update.role/${values._id}`, {
      role: values.role,
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationUserRolePatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: IUserRoleProps) => patchUserRole(values),
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
    onError(error: AxiosError<Response<any>>) {
      toast.error(error?.message || 'Failed to change Role', {
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

export default useMutationUserRolePatch;
