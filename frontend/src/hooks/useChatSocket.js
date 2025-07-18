// /frontend/src/hooks/useChatSocket.js
import { useEffect, useState } from 'react';
import socket, { connectSocket, disconnectSocket, onEvent, offEvent } from '../utils/socket';

export const useChatSocket = (token, roomId) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token || !roomId) return;

    connectSocket(token, roomId);

    const handleConnect = () => {
      setIsConnected(true);
      socket.emit('joinRoom', roomId); // FIX: match backend
    };

    const handleDisconnect = () => setIsConnected(false);

    const handleReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    onEvent('connect', handleConnect);
    onEvent('disconnect', handleDisconnect);
    onEvent('receiveMessage', handleReceive); // FIX: match backend

    return () => {
      offEvent('receiveMessage');
      disconnectSocket();
    };
  }, [token, roomId]);

  const sendMessage = (message) => {
    if (socket && socket.connected) {
      socket.emit('sendMessage', { roomId, message }); // FIX: match backend
    }
  };

  return {
    socket,
    messages,
    sendMessage,
    isConnected,
  };
};
