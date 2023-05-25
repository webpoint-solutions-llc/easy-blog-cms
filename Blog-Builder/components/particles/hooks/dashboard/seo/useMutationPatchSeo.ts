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

export type Iprops = {
  id: string;
  values: ISeoTemplate;
};

export const patchSeoTemplate = async (id: string, values: ISeoTemplate) => {
  try {
    const { data } = await api.patch(`/seo-template/${id}`, values);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationPatchSeo = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ id, values }: Iprops) => patchSeoTemplate(id, values),
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

export default useMutationPatchSeo;
