import { AxiosError } from 'axios';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { Response } from '@particles/responseInterface/main';

export interface IDeleteBlogProps {
  id: string;
  deletePermanently?: boolean;
}

export const deletePost = async (id: string, deletePermanently?: boolean) => {
  try {
    const { data } = await api.delete(`/blog/${id}`, {
      data: { deletePermanently },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationDeletePost = (showToast?: boolean, redirect?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, deletePermanently }: IDeleteBlogProps) => deletePost(id, deletePermanently),

    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      queryClient.invalidateQueries({ queryKey: ['blogs.list'] });
      if (redirect || redirect === '') navigate(redirect === '' ? '/dashboard/blogs/overview/' : redirect);
    },
    onError(error: AxiosError<Response<any>>) {
      toast.error(error?.response?.data?.message || 'Failed to delete blog', {
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

export default useMutationDeletePost;
