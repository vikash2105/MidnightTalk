import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http'; // ✅ Needed for creating the server
import { Server } from 'socket.io';

import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const server = http.createServer(app); // ✅ Attach HTTP server to Express

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000', 'https://midnighttalk.vercel.app'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ✅ Socket.IO Connection Listener
io.on('connection', (socket) => {
  console.log('🟢 A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected:', socket.id);
  });

  // Example: Custom events can be added here
  // socket.on("sendMessage", (data) => {
  //   io.emit("receiveMessage", data);
  // });
});

// ✅ CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://midnighttalk.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Health Check
app.get("/", (req, res) => {
  res.send("✅ Backend is running and healthy!");
});

// ✅ Connect MongoDB and Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => { // ✅ Use `server.listen()` not `app.listen()`
      console.log(`🚀 Backend running on port ${PORT}`);
      console.log(`🌐 API base: https://midnighttalk.onrender.com/api`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();
