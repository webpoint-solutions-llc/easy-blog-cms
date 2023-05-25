import React, { useEffect } from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';

import useGetParams from '@particles/hooks/usetGetParams';
import { PaginationResponse } from '@particles/responseInterface/main';
import { File, MediaList } from '@particles/responseInterface/blog/blog.list.interface';

const useUploadMediaQuery = () => {
  const link = `${import.meta.env.VITE_BACKEND_HOST}/media/media.list`;

  const [result, setResult] = React.useState<AxiosResponse<PaginationResponse<MediaList[]>, any>>();

  const [error, setError] = React.useState<AxiosError>();

  const content = useGetParams('content') || '';

  useEffect(() => {
    getUploadData(1, 20, '');
  }, [content]);

  const getUploadData = async (page = 1, perPage = 20, search: string) => {
    try {
      const data = await axios.get<PaginationResponse<MediaList[]>>(
        `${link}?page=${page}&perPage=${perPage}&search=${search}&content=${content}`,
      );
      setResult(data);
      setError(undefined);
    } catch (e) {
      const error = e as unknown as AxiosError;
      setError(error);
      setResult(undefined);
    }
  };

  return { getUploadData, result, error };
};
export default useUploadMediaQuery;
