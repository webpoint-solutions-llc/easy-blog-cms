import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import api from '@particles/helper/api';
import { useNavigate } from 'react-router-dom';
import { InputTicket } from '@particles/responseInterface/ticket/ticket.interface';

export type Iprops = {
  id: string;
  values: InputTicket;
};

export const patchTicket = async (id: string, values: InputTicket) => {
  try {
    const { data } = await api.patch(`/ticket/${id}`, values);

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useMutationPatchTicket = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, values }: Iprops) => patchTicket(id, values),
    onSuccess: (data) => {
      toast.success(data.message, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
      });

      queryClient.invalidateQueries({ queryKey: ['ticket.single'] });
    },
    onError(error: AxiosError) {
      toast.error(error?.message || 'Failed to edit Ticket', {
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

export default useMutationPatchTicket;
