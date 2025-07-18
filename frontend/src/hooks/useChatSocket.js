// /frontend/src/hooks/useChatSocket.js

import { useEffect, useState, useRef } from 'react';
import socket, { connectSocket, disconnectSocket, onEvent, offEvent } from '../utils/socket';

export const useChatSocket = (token, roomId) => {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  const reconnectInterval = useRef(null);

  useEffect(() => {
    if (!token || !roomId) return;

    connectSocket(token, roomId);

    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleConnect = () => {
      console.log('✅ Connected to socket');
      setConnected(true);
      socket.emit('join', { roomId });
    };

    const handleDisconnect = () => {
      console.warn('⚠️ Disconnected from socket');
      setConnected(false);
    };

    const handleError = (err) => {
      console.error('❌ Socket error:', err);
    };

    onEvent('connect', handleConnect);
    onEvent('disconnect', handleDisconnect);
    onEvent('message', handleMessage);
    onEvent('error', handleError);

    // Auto-reconnect logic
    reconnectInterval.current = setInterval(() => {
      if (!connected) {
        console.log('🔁 Trying to reconnect...');
        connectSocket(token, roomId);
      }
    }, 5000); // every 5 seconds

    return () => {
      offEvent('connect');
      offEvent('disconnect');
      offEvent('message');
      offEvent('error');

      clearInterval(reconnectInterval.current);
      disconnectSocket();
    };
  }, [token, roomId]);

  const sendMessage = (text) => {
    const message = {
      message: text,
      timestamp: Date.now(),
    };
    socket.emit('message', message);
    setMessages((prev) => [...prev, { ...message, senderId: socket.id }]);
  };

  return {
    socket,
    messages,
    sendMessage,
    connected,
  };
};
