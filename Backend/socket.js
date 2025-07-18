import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://midnighttalk.vercel.app'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  // ✅ Authenticate each socket connection
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) return next(new Error('Token missing'));

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;
      next();
    } catch {
      return next(new Error('Token invalid'));
    }
  });

  // ✅ On socket connect
  io.on('connection', (socket) => {
    const { user } = socket;
    console.log(`🟢 ${user.role} connected: ${socket.id}`);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit('userJoined', { role: user.role, id: socket.id });
    });

    socket.on('sendMessage', ({ roomId, message }) => {
      io.to(roomId).emit('receiveMessage', {
        sender: user.role,
        message,
        timestamp: new Date(),
      });
    });

    // ✅ WebRTC Signaling
    socket.on('offer', ({ roomId, offer }) => {
      socket.to(roomId).emit('offer', offer);
    });

    socket.on('answer', ({ roomId, answer }) => {
      socket.to(roomId).emit('answer', answer);
    });

    socket.on('ice-candidate', ({ roomId, candidate }) => {
      socket.to(roomId).emit('ice-candidate', candidate);
    });

    // ❌ Panic disconnect
    socket.on('panic', (roomId) => {
      io.to(roomId).emit('panic');
      io.socketsLeave(roomId);
    });

    socket.on('disconnect', () => {
      console.log(`🔴 ${user.role} disconnected: ${socket.id}`);
    });
  });
};

export default initSocket;
