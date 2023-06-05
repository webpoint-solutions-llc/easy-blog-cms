import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '../usetGetParams';
import useCurrentPage from '../useCurrentPage';
import { PaginationResponse } from '@particles/responseInterface/main';
import { IUser } from '@particles/responseInterface/user/user.list.interface';

interface IUserFilterProps {
  signal: AbortSignal | undefined;
  page: number;
  search: string;
  content: string;
  excludeWebPortalUser?: boolean;
  fullName?: string;
  startDate?: string;
  endDate?: string;
  lastLogin?: string;
  numberOfPost?: string;
}

export const getUserList = async ({
  signal,
  page,
  search,
  content,
  excludeWebPortalUser,
  startDate,
  endDate,
  lastLogin,
  numberOfPost,
  fullName,
}: IUserFilterProps) => {
  try {
    const { data } = await api.get<PaginationResponse<IUser>>('/admin/user/list', {
      signal,
      params: {
        page,
        ...(search ? { search } : {}),
        ...(content ? { content } : {}),
        ...(fullName ? { fullName } : {}),
        ...(lastLogin ? { lastLogin } : {}),
        ...(numberOfPost ? { numberOfPost } : {}),
        ...(startDate && endDate ? { createdAt: JSON.stringify({ gt: startDate, lt: endDate }) } : {}),
        excludeWebPortalUser,
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchUserList = (excludeWebPortalUser?: boolean) => {
  const page = useCurrentPage();
  const search = useGetParams('search') || '';
  const fullName = useGetParams('fullName') || '';
  const content = useGetParams('content') || '';
  const lastLogin = useGetParams('lastLogin') || '';
  const endDate = useGetParams('endDate') || '';
  const startDate = useGetParams('startDate') || '';
  const numberOfPost = useGetParams('numberOfPost') || '';

  return useQuery({
    queryKey: [
      'user.list',
      { page, search, content, excludeWebPortalUser, startDate, endDate, lastLogin, numberOfPost, fullName },
    ],
    queryFn: ({ signal }) =>
      getUserList({
        signal,
        page,
        search,
        content,
        excludeWebPortalUser,
        startDate,
        endDate,
        lastLogin,
        numberOfPost,
        fullName,
      }),
  });
};

export default useFetchUserList;
