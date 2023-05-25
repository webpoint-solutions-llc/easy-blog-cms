import { useQuery } from '@tanstack/react-query';

import api from '@particles/helper/api';
import useGetParams from '@particles/hooks/usetGetParams';
import useCurrentPage from '@particles/hooks/useCurrentPage';

export const getBlogSeo = async (page: number, search: string, pageType: string) => {
  try {
    const { data } = await api.get('/seo-template/seo-template.list', {
      params: {
        page,
        ...(search ? { search } : {}),
        ...(pageType ? { pageType } : {}),
      },
    });

    return data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

export const useFetchSeo = () => {
  const search = useGetParams('search') || '';
  const pageType = useGetParams('pageType') || '';
  const page = useCurrentPage();

  return useQuery({
    queryKey: ['seo.list', page, search, pageType],
    queryFn: () => getBlogSeo(page, search, pageType),
  });
};

export default useFetchSeo;
