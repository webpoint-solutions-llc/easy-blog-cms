import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';
import { PaginationResponse } from '@particles/responseInterface/main';

import { ITicket } from '@particles/responseInterface/ticket/ticket.interface';

interface IProps {
  page: number;
  search: string;
  status: string;
  severity: string;
  problemType: string;
  createdAt: string;
}

export const getTickets = async ({ page, search, status, severity, problemType, createdAt }: IProps) => {
  try {
    const { data } = await api.get<PaginationResponse<ITicket[]>>('/ticket/all.list', {
      params: {
        page,
        ...(search ? { search } : {}),
        ...(status ? { status } : {}),
        ...(severity ? { severity } : {}),
        ...(createdAt ? { createdAt } : {}),
        ...(problemType ? { problemType } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchTickets = () => {
  let createdAt = '';
  const statusOption = ['Opened', 'Closed', 'Pending'];

  const page = useCurrentPage();
  let status = useGetParams('status') || '';
  const search = useGetParams('search') || '';
  const endDate = useGetParams('endDate') || '';
  const severity = useGetParams('severity') || '';
  const startDate = useGetParams('startDate') || '';
  const problemType = useGetParams('problemType') || '';

  if (status) status = statusOption.includes(status) ? status : '';

  if (startDate && endDate)
    createdAt = JSON.stringify({
      gt: startDate,
      lt: endDate,
    });

  return useQuery({
    queryKey: ['ticket.list', { page, search, status, severity, problemType, createdAt }],
    queryFn: () => getTickets({ page, search, status, severity, problemType, createdAt }),
  });
};

export default useFetchTickets;
