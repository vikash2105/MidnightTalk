import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// ✅ CORS Configuration: Allow frontend on Vercel & local dev
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

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running and healthy!");
});

// ✅ MongoDB Connection + Start Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("✅ Connected to MongoDB");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
      console.log(`🌐 API base: https://midnighttalk.onrender.com/api`);
    });

  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

startServer();
