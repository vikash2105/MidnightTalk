import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://midnighttalk.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Middleware to authenticate socket users using JWT
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error('No token provided'));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = user; // Attach decoded user info (e.g., { id, role }) to socket
    next();
  } catch (err) {
    next(new Error('Authentication failed'));
  }
});

// ✅ Socket.IO Events
io.on('connection', (socket) => {
  console.log(`🟢 ${socket.user.role} connected: ${socket.id}`);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('userJoined', { role: socket.user.role, id: socket.id });
  });

  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('receiveMessage', {
      sender: socket.user.role,
      message,
      timestamp: new Date()
    });
  });

  // 🔁 WebRTC signaling events
  socket.on('offer', ({ roomId, offer }) => {
    socket.to(roomId).emit('offer', offer);
  });

  socket.on('answer', ({ roomId, answer }) => {
    socket.to(roomId).emit('answer', answer);
  });

  socket.on('ice-candidate', ({ roomId, candidate }) => {
    socket.to(roomId).emit('ice-candidate', candidate);
  });

  // ❌ Panic button to disconnect both users
  socket.on('panic', (roomId) => {
    io.to(roomId).emit('panic');
    io.socketsLeave(roomId);
  });

  socket.on('disconnect', () => {
    console.log(`🔴 ${socket.user.role} disconnected: ${socket.id}`);
  });
});

// ✅ CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://midnighttalk.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ JSON Middleware
app.use(express.json());

// ✅ API Routes
app.use("/api/auth", authRoutes);

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend is running and healthy!");
});

// ✅ MongoDB + Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
      console.log(`🌐 API base: https://midnighttalk.onrender.com/api`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();
