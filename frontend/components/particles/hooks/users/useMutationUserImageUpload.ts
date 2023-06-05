import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import api from '@particles/helper/api';
import { Response } from '@particles/responseInterface/main';
import { convertJsonToFormData } from '@particles/helper/jsonToFormData';

interface IImageUploadProps {
  file: File;
}

export const uploadUserImage = async ({ file }: IImageUploadProps) => {
  try {
    await api.post('/user/profile/upload', convertJsonToFormData({ file }));
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationUserImageUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IImageUploadProps) => uploadUserImage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user.current'] });

      toast.success('Profile image uploaded sucessfully', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });
    },
    onError(error: AxiosError<Response<any>>) {
      toast.error(error?.response?.data?.message || 'Failed to upload image', {
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

export default useMutationUserImageUpload;
