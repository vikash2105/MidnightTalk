// /frontend/src/utils/socket.js
import { io } from "socket.io-client";

const SERVER_URL = process.env.REACT_APP_API_URL || "https://midnighttalk.onrender.com";

// Singleton socket instance
const socket = io(SERVER_URL, {
  transports: ["websocket"],
  autoConnect: false, // Manual connection
});

// Start connection
export const connectSocket = (token, roomId) => {
  if (!socket.connected) {
    socket.auth = { token, roomId }; // pass auth info before connect
    socket.connect();
  }
};

// Disconnect socket
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// Emit custom event
export const emitEvent = (event, data) => {
  if (socket.connected) {
    socket.emit(event, data);
  }
};

// Add listener
export const onEvent = (event, callback) => {
  socket.on(event, callback);
};

// Remove listener
export const offEvent = (event) => {
  socket.off(event);
};

export default socket;
