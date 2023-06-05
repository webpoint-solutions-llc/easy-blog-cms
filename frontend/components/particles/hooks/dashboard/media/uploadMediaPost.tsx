import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { Response } from '@particles/responseInterface/main';
import getFromLocalStorage from '@particles/helper/getFromLocal';

const useUploadMediaMigration = () => {
  const link = `${import.meta.env.VITE_BACKEND_HOST}/media`;

  const [result, setResult] = React.useState<AxiosResponse<Response<void>, any>>();

  const [error, setError] = React.useState<AxiosError>();

  const postUploadData = async (file: File) => {
    try {
      const formData = new FormData();

      formData.append('file', file);
      const data = await axios.post<Response<void>>(`${link}`, formData, {
        headers: {
          Authorization: `Bearer ${getFromLocalStorage('accessToken')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setResult(data);
      setError(undefined);
    } catch (e) {
      const error = e as unknown as AxiosError;
      setError(error);
      setResult(undefined);
    }
  };

  return { postUploadData, result, error };
};
export default useUploadMediaMigration;
