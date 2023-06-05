import React, { createContext, useContext, useEffect } from 'react';

import { io, Socket } from 'socket.io-client';

import getFromLocalStorage from '@particles/helper/getFromLocal';

interface SocketContextProps {
  socket: Socket;
}

const socket_host = import.meta.env.VITE_PUBLIC_SOCKET_HOST || 'https://talent-point-api.internal.webpoint.io/';
const token = getFromLocalStorage('accessToken');

const SocketContext = createContext<SocketContextProps>({
  socket: io(),
});

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = io(socket_host, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 500,
    randomizationFactor: 0.5,
    auth: {
      token: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

const useSocket = (): Socket => {
  const { socket } = useContext(SocketContext);

  return socket;
};

export { SocketProvider, useSocket };
