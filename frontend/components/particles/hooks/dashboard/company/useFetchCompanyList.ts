import { useQuery } from '@tanstack/react-query';

import moment from 'moment';
import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import { JobPostedDateConst } from '@organisms/Dashboard/Company/const';

type IFilterValue = {
  gt: number | string;
  lt: number | string;
};

export const getCompanyList = async (
  signal: AbortSignal | undefined,
  page: number,
  search: string,
  numberOfEmployees: string | undefined,
  createdAt: IFilterValue | undefined,
) => {
  try {
    const { data } = await api.get('/companyProfiles/companyProfiles.list', {
      signal,
      params: {
        page,
        ...(search ? { search } : {}),
        ...(numberOfEmployees && numberOfEmployees != 'Any' ? { numberOfEmployees } : {}),
        ...(createdAt ? { createdAt: JSON.stringify(createdAt) } : {}),
      },
    });

    return data as any;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchCompanyList = (page: number) => {
  const search = useGetParams('search') || '';
  const companySize: string = useGetParams('companySize') || '';
  const jobDate = useGetParams('jobDate') || '';

  return useQuery({
    queryKey: ['company.list', page, companySize, jobDate, search],
    queryFn: ({ signal }) => getCompanyList(signal, page, search, companySize, getQueryDate(jobDate)),
  });
};

export const getQueryValue = (value: string) => {
  if (!value) return undefined;

  const row = value.split('-');
  return row[1]
    ? {
        gt: row[0],
        lt: row[1],
      }
    : undefined;
};

export const getQueryDate = (value: string) => {
  if (!value) return undefined;

  let gt;
  switch (value) {
    case JobPostedDateConst.Today:
      gt = moment().format('YYYY-MM-DD');
      break;
    case JobPostedDateConst.Last3days:
      gt = moment().subtract(3, 'days').format('YYYY-MM-DD');
      break;
    case JobPostedDateConst.Last30days:
      gt = moment().subtract(1, 'months').format('YYYY-MM-DD');
      break;
    case JobPostedDateConst.Last3months:
      gt = moment().subtract(1, 'months').format('YYYY-MM-DD');
      break;
  }

  return gt ? { gt: gt, lt: moment().add(1, 'days').format('YYYY-MM-DD') } : undefined;
};

export default useFetchCompanyList;
