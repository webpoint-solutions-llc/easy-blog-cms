import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import saveToLocalStorage from './saveToLocal';
import getFromLocalStorage from './getFromLocal';

interface ErrorResponse {
  message: string;
  status: 'error';
}

const baseURL = import.meta.env.VITE_BACKEND_HOST;

const api = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  },
});

const defaultErrorHandler = (error: AxiosError<ErrorResponse>) => {
  return () => {
    let message;
    if (error.response?.status) {
      // The request was made and the server responded with an error status code
      message = error.response?.data?.message || error.message;
    } else if (error.request) {
      // The request was made but no response was received
      message = 'Could not connect to the server. Please try again later';
    } else {
      // Something happened in setting up the request that triggered an Error
      message = 'Something went wrong!';
    }

    toast.error(message);

    // trigger error notification
    console.error(message);
  };
};

// set bearer token
api.interceptors.request.use(
  (config) => {
    const token = getFromLocalStorage('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// refresh token
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (originalConfig.url !== '/user/login' && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const config = {
            headers: { Authorization: `Bearer ${getFromLocalStorage('refreshToken')}` },
          };

          const rs = await axios.get(baseURL + '/user/refresh', config);

          const { accessToken, refreshToken } = rs?.data?.data;
          saveToLocalStorage('accessToken', accessToken);
          saveToLocalStorage('refreshToken', refreshToken);

          return api(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    } else defaultErrorHandler(err);

    return Promise.reject(err);
  },
);

export default api;
