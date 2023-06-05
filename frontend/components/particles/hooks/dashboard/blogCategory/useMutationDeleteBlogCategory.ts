import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';
import { Response } from '@particles/responseInterface/main';

export const deleteBlogCategory = async (values: string) => {
  try {
    const { data } = await api.delete(`/blog-category/${values}`);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationDeleteBlogCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: string) => deleteBlogCategory(values),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      queryClient.invalidateQueries({ queryKey: ['blog-category.list'] });
    },
    onError(error: AxiosError<Response<any>>, variables, context) {
      toast.error(error.response?.data?.message || 'Failed to delete Category', {
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

export default useMutationDeleteBlogCategory;
