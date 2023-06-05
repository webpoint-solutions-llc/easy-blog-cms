import React from 'react';
import { Outlet } from 'react-router-dom';

const EmptyContainer: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default EmptyContainer;
