import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';

export const deleteComment = async (value: string) => {
  try {
    const { data } = await api.delete(`/comment/${value}`);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: string) => deleteComment(value),

    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      queryClient.invalidateQueries({ queryKey: ['comments.list'] });
    },
    onError(error: AxiosError, variables, context) {
      toast.error(error?.message || 'Failed to delete Category', {
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

export default useMutationDeleteComment;
