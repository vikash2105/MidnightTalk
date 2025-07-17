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
import Session from "./pages/Session";
import Wallet from "./pages/Wallet";
import Queue from "./pages/Queue";
import Kyc from "./pages/Kyc";
import Earnings from "./pages/Earnings";

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

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
          path="/queue"
          element={
            isAuthenticated ? <Queue /> : <Navigate to="/login" replace />
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
          path="*"
          element={
            <div className="flex justify-center items-center h-screen">
              <h2 className="text-2xl text-flame">404 - Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
