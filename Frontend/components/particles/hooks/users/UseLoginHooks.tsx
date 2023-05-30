import React from 'react';

import axios, { AxiosError, AxiosResponse } from 'axios';

import { Response } from '@particles/responseInterface/main';
import { IAdminLogin } from '@particles/responseInterface/login';

interface input {
  email: string;
  password: string;
}

/**
 * It's a function that returns an object with three properties: uploadData, result, and error.
 *
 * The uploadData property is a function that takes two arguments: value and role.
 *
 * The value argument is an object with two properties: email and password.
 *
 * The role argument is a string.
 *
 * The uploadData function returns a promise that resolves to an object with two properties: data and
 * status.
 *
 * The data property is an object with two properties: data and status.
 *
 * The data property is an object with two properties: id and token.
 *
 * The id property is a string.
 *
 * The token property is a string.
 *
 * The status property is a string.
 *
 * The result property is an object with two properties: data and status.
 * @returns An object with three properties: uploadData, result, and error.
 */
const useLoginHooks = () => {
  const link = `${import.meta.env.VITE_BACKEND_HOST}/user/login`;

  const [result, setResult] = React.useState<AxiosResponse<Response<IAdminLogin>, input>>();

  const [error, setError] = React.useState<AxiosError>();

  const uploadData = async (value: input, role: string) => {
    try {
      const data = await axios.post<Response<IAdminLogin>>(link, { ...value, portal: role });

      setResult(data);
      setError(undefined);
    } catch (e) {
      const error = e as unknown as AxiosError;
      setError(error);
      setResult(undefined);
    }
  };

  return { uploadData, result, error };
};

export default useLoginHooks;
