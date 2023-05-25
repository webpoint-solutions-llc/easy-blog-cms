import React from 'react';
import { useLocation } from 'react-router-dom';

function useGetParams(name: string) {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  let currentPageIndex = queryParams.get(name);

  return currentPageIndex;
}

export default useGetParams;
