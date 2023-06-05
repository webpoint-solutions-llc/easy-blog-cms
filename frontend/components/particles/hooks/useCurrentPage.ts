import React from 'react';
import { useLocation } from 'react-router-dom';

function useCurrentPage() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  let currentPageIndex = queryParams.get('pageNo');

  if (!currentPageIndex) {
    currentPageIndex = '1';
  }

  return parseInt(currentPageIndex);
}

export default useCurrentPage;
