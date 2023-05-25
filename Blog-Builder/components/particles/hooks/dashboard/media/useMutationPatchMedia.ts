import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import api from '@particles/helper/api';
import { Response } from '@particles/responseInterface/main';
import { IBlogContentPost } from '@particles/interface/blogContentPost.interface';
import { IMediaFile } from '@particles/responseInterface/media/uploadMedia.interface';

interface IProps {
  id: string;
  payload: IMediaFile | Partial<IMediaFile>;
}

export const patchMedia = async ({ id, payload }: IProps) => {
  try {
    const { data } = await api.patch(`/media/${id}`, payload);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationPatchMedia = (redirect?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: IProps) => patchMedia(values),
    onSuccess: (data) => {
      toast.success(data?.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      if (redirect || redirect === '') navigate(redirect === '' ? '/dashboard/blogs/media/' : redirect);
    },
    onError(error: AxiosError<Response<any>>) {
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

export default useMutationPatchMedia;
