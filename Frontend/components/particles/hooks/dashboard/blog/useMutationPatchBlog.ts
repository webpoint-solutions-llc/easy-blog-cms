import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import api from '@particles/helper/api';
import { Response } from '@particles/responseInterface/main';
import { IBlogContentPost } from '@particles/interface/blogContentPost.interface';

export interface ICreateBlog {
  _id: string;
  title: string;
  slug: string;
  url: string;
  blog_uuid: string;
  keyword: string;
  tags: any[];
  meta_description: string;
  time_to_read: number;
  blogCategory: string[];
  description: string;
  content: string[];
  banner_image: string;
}

export const patchBlog = async (values: IBlogContentPost | Partial<IBlogContentPost>) => {
  try {
    const { data } = await api.patch(`/blog/update`, values);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationPatchBlog = (showToast?: boolean, redirect?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: IBlogContentPost | Partial<IBlogContentPost>) => patchBlog(values),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs.overview'] });
      queryClient.invalidateQueries({ queryKey: ['blogs.list'] });

      if (showToast) {
        toast.success(data?.message, {
          position: 'top-right',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'light',
        });
      }

      if (redirect || redirect === '') navigate(redirect === '' ? '/dashboard/blogs/overview/' : redirect);
    },
    onError(error: AxiosError<Response<any>>) {
      if (showToast)
        toast.error(error?.response?.data?.message || 'Failed to create Category', {
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

export default useMutationPatchBlog;
