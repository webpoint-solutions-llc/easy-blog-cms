import { useMutation } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';
import { useNavigate } from 'react-router-dom';

export type ISeoTemplate = {
  heading: string;
  url: string;
  meta_description: string;
  meta_title: string;
  meta_keywords: string;
  pageType: string;
};

export const postSeoTemplate = async (values: ISeoTemplate) => {
  try {
    const { data } = await api.post(`/seo-template`, values);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationPostSeo = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: ISeoTemplate) => postSeoTemplate(values),
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
    onError(error: AxiosError, variables, context) {
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

export default useMutationPostSeo;
