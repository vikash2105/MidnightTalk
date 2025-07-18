import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Wallet from './pages/Wallet';
import ListenerQueue from './pages/ListenerQueue';
import Kyc from './pages/Kyc';
import Earnings from './pages/Earnings';
import ChatRoom from './pages/ChatRoom';
import Session from './pages/Session'; // ✅ Add this import

function App() {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

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

        <Route
          path="/session"
          element={
            isAuthenticated ? <Session /> : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/room/:roomId"
          element={
            isAuthenticated ? <ChatRoom token={token} /> : <Navigate to="/login" replace />
          }
        />

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
