import { createSearchParams, useNavigate } from 'react-router-dom';

export const useNavigateParams = () => {
  const navigate = useNavigate();

  return (pathname: string, params: Record<string, any>) => {
    const path = {
      pathname,
      search: createSearchParams(params).toString(),
    };
    navigate(path);
  };
};
