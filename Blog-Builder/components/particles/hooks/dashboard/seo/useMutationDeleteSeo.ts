import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';

export const deleteSeoTemplate = async (value: string) => {
  try {
    const { data } = await api.delete(`/seo-template/${value}`);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationDeleteSeoTemplate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: string) => deleteSeoTemplate(value),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
      queryClient.invalidateQueries({ queryKey: ['seo.list'] });
    },
    onError(error: AxiosError) {
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

export default useMutationDeleteSeoTemplate;
