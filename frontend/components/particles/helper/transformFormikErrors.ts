import { AxiosError } from 'axios';

import { IErrorResponse } from '@particles/responseInterface/main';

export const transformFormikErrors = (error?: AxiosError<IErrorResponse> | null) => {
  if (!error) return {};

  let formikErrors: Record<string, any> = {};

  Array.isArray(error?.response?.data?.errors) &&
    error?.response?.data?.errors?.map((row) => {
      formikErrors = { ...formikErrors, [row.property]: row.message };
    });

  return formikErrors;
};
