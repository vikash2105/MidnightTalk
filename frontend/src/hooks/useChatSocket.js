import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

export const useChatSocket = (token, roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token || !roomId) return;

    const socket = io(process.env.REACT_APP_API_URL, {
      query: { token, roomId },
      transports: ['websocket'], // Optional: Forces WebSocket only
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Connected to socket server');
    });

    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.emit('join', { roomId });

    return () => {
      socket.disconnect();
    };
  }, [token, roomId]);

  const sendMessage = (message) => {
    if (socketRef.current) {
      socketRef.current.emit('message', { message });
    }
  };

  return {
    socket: socketRef.current,
    messages,
    sendMessage,
  };
};
