import React from 'react';
import { path } from '@pages/path';

import { SocketProvider } from '@particles/context/SocketContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const router = createBrowserRouter(path);

  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </SocketProvider>
  );
};

export default App;
