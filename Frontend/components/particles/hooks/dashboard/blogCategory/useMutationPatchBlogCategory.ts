import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';
import { useNavigate } from 'react-router-dom';

export type IBlogCategory = {
  name: string;
  slug: string;
  description: string;
};

type IProps = {
  id: string | undefined;
  values: IBlogCategory;
};

export const patchBlogCategory = async (id: string | undefined, values: IBlogCategory) => {
  try {
    const { data } = await api.patch(`/blog-category/${id}`, values);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationPatchBlogCategory = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, values }: IProps) => patchBlogCategory(id, values),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      navigate(-1);
    },
    onError(error: AxiosError) {
      toast.error(error?.message || 'Failed to create Category', {
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

export default useMutationPatchBlogCategory;
