import getFromLocalStorage from '@particles/helper/getFromLocal';
import LoadingPage from '@templates/LoadingPage';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IAuthSec {
  children: React.ReactNode;
}

const AuthSec: React.FC<IAuthSec> = ({ children }) => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (getFromLocalStorage('accessToken') && getFromLocalStorage('refreshToken')) {
      setIsLogin(true);
    } else {
      navigate('/');
    }
  }, []);

  if (isLogin) {
    return <>{children}</>;
  }

  return <LoadingPage />;
};

export default AuthSec;
