import React from 'react';

interface ITableContainer {
  children: React.ReactNode;
}

const TableContainer: React.FC<ITableContainer> = ({ children }) => {
  return <section className="w-full shadow-card rounded-lg pb-6">{children}</section>;
};

export default TableContainer;
