import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

import authRoutes from './routes/authRoutes.js';
import initSocket from './socket.js'; // ✅ Import socket handler

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ CORS Setup
app.use(cors({
  origin: ['http://localhost:3000', 'https://midnighttalk.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ API Routes
app.use('/api/auth', authRoutes);

// ✅ Health Check
app.get('/', (req, res) => {
  res.send('✅ Backend is running and healthy!');
});

// ✅ Initialize WebSocket with the HTTP server
initSocket(server);

// ✅ MongoDB & Server Start
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

startServer();
