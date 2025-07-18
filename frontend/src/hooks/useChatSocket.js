import { useEffect, useRef, useState } from 'react';
import { connectSocket } from '../utils/socket';

export const useChatSocket = (token, roomId) => {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!token || !roomId) return;

    const socket = connectSocket(token);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log("🟢 Socket connected");
      socket.emit('joinRoom', roomId);
    });

    socket.on('receiveMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('panic', () => {
      alert("❌ Session was ended by the other user.");
      socket.disconnect();
    });

    return () => {
      socket.disconnect();
    };
  }, [token, roomId]);

  const sendMessage = (msg) => {
    if (!msg.trim()) return;
    socketRef.current.emit('sendMessage', { roomId, message: msg });
  };

  return {
    socket: socketRef.current,
    messages,
    sendMessage,
  };
};
