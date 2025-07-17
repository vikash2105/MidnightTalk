import { io } from "socket.io-client";

const socket = io("https://midnighttalk.onrender.com", {
  withCredentials: true,
});

export default socket;
