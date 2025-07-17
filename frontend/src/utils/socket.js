// /frontend/src/utils/socket.js

import { io } from "socket.io-client";

// Change this to your Render backend URL or localhost during dev
const SERVER_URL = process.env.REACT_APP_API_URL || "https://midnighttalk.onrender.com";

// Initialize socket instance
const socket = io(SERVER_URL, {
  transports: ["websocket"], // Ensures WebSocket over polling
  autoConnect: false,        // Connect manually (more control)
});

// Socket connection functions

// Start the connection (call after login or room join)
export const connectSocket = () => {
  if (!socket.connected) socket.connect();
};

// Disconnect when leaving room or logging out
export const disconnectSocket = () => {
  if (socket.connected) socket.disconnect();
};

// Emit events
export const emitEvent = (event, data) => {
  if (socket.connected) socket.emit(event, data);
};

// Listen to events
export const onEvent = (event, callback) => {
  socket.on(event, callback);
};

// Stop listening (optional cleanup)
export const offEvent = (event) => {
  socket.off(event);
};

// Export socket instance for signaling
export default socket;
