import React from 'react';

import EmptyPage from '@organisms/EmptyPage';
import NotFoundPage from '@organisms/ErrorPage';
import LoadingPage from '@templates/LoadingPage';

const FetchWrapper: React.FC<{
  isLoading: boolean;
  isError: boolean;
  error?: any;
  totalData?: number;
  children: React.ReactNode;
}> = ({ isLoading, isError, error, totalData, children }) => {
  if (isLoading) return <LoadingPage />;
  if (isError) return <NotFoundPage />;
  if (totalData === 0) return <EmptyPage />;

  return <>{children}</>;
};

export default FetchWrapper;
