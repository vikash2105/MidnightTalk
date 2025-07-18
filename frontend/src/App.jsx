import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './style.css';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Session from "./pages/Session";
import Wallet from "./pages/Wallet";
import ListenerQueue from "./pages/ListenerQueue";
import Kyc from "./pages/Kyc";
import Earnings from "./pages/Earnings";
import { ChatRoom } from './pages/ChatRoom'; // ✅ Import new page

function App() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  // Optional: You can decode token here to get user role
  // const { role } = JSON.parse(atob(token.split('.')[1])); // decode JWT payload

  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/session"
          element={
            isAuthenticated ? <Session /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/wallet"
          element={
            isAuthenticated ? <Wallet /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/listener-queue"
          element={
            isAuthenticated ? <ListenerQueue /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/kyc"
          element={
            isAuthenticated ? <Kyc /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/earnings"
          element={
            isAuthenticated ? <Earnings /> : <Navigate to="/login" replace />
          }
        />

        {/* ✅ New ChatRoom route */}
        <Route
          path="/chat-room"
          element={
            isAuthenticated ? (
              <ChatRoom token={token} roomId="midnight-room-001" /> // TEMP room ID
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
              <h2 style={{ fontSize: '24px', color: '#FF5722' }}>404 - Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
