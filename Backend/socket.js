const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['https://your-frontend-url.com'], // replace with your frontend URL
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;
      next();
    } catch {
      next(new Error('Unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    const { user } = socket;
    console.log(`${user.role} connected: ${socket.id}`);

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

    // WebRTC Signaling
    socket.on('offer', (data) => {
      socket.to(data.roomId).emit('offer', data.offer);
    });

    socket.on('answer', (data) => {
      socket.to(data.roomId).emit('answer', data.answer);
    });

    socket.on('ice-candidate', (data) => {
      socket.to(data.roomId).emit('ice-candidate', data.candidate);
    });

    // Panic button
    socket.on('panic', (roomId) => {
      io.to(roomId).emit('panic');
      io.socketsLeave(roomId);
    });

    socket.on('disconnect', () => {
      console.log(`${user.role} disconnected: ${socket.id}`);
    });
  });
};

module.exports = initSocket;
