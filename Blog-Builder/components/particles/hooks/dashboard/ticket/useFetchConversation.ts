import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';

import { PaginationResponse } from '@particles/responseInterface/main';
import { IMessageThread, ITicket } from '@particles/responseInterface/ticket/ticket.interface';

interface IProps {
  page: number;
  search: string;
  ticket: string;
}

export const getTicketMessage = async ({ page, search, ticket }: IProps) => {
  try {
    const { data } = await api.get<PaginationResponse<IMessageThread[]>>(
      `/message-thread/message-thread.list/${ticket}`,
      {
        params: {
          page,
          ...(search ? { search } : {}),
          perPage: 4,
        },
      },
    );

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchConversation = ({ ticket, page }: { ticket: string; page: number }) => {
  const search = useGetParams('search') || '';

  return useQuery({
    queryKey: ['message.list', { page, search, ticket }],
    queryFn: () => getTicketMessage({ page, search, ticket }),
    refetchOnWindowFocus: false,
    enabled: !!ticket,
  });
};

export default useFetchConversation;
