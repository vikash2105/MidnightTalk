import { createContext, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const socket = io(process.env.REACT_APP_API_URL, {
  transports: ['websocket'],
  reconnection: true,
  reconnectionAttempts: 5,
});

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
