import { createSearchParams, useNavigate } from 'react-router-dom';

const useSetParams = () => {
  const navigate = useNavigate();
  return (pathname: string, params: any) => navigate(`${pathname}/?${createSearchParams(params)}`);
};

export default useSetParams;
