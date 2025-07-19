import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Session = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(() =>
    Math.floor(100000 + Math.random() * 900000).toString()
  );

  const handleStartSession = () => {
    if (!roomId.trim()) return alert("Please enter a Room ID");
    navigate(`/room/${roomId}`, { state: { role: "speaker" } });
  };

  const handleJoinAsListener = () => {
    if (!roomId.trim()) return alert("Enter a valid Room ID");
    navigate(`/room/${roomId}`, { state: { role: "listener" } });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

        .session-wrapper {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #0d0d0d, #1a1a2e, #0d0d0d);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', sans-serif;
          padding: 2rem;
          position: relative;
        }

        .session-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          padding: 2.5rem;
          border-radius: 20px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 0 25px rgba(255, 76, 139, 0.1);
        }

        .session-logo {
          position: absolute;
          top: 20px;
          left: 20px;
          font-family: 'Great Vibes', cursive;
          font-size: 1.8rem;
          color: #ff4c8b;
        }

        .session-title {
          font-size: 2rem;
          font-weight: bold;
          color: #ff4c8b;
          margin-bottom: 2rem;
          text-align: center;
        }

        .session-label {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          color: #ccc;
        }

        .session-input {
          width: 100%;
          padding: 0.8rem 1rem;
          margin-bottom: 1.5rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.07);
          border: none;
          color: white;
          font-size: 1rem;
        }

        .session-input::placeholder {
          color: #aaa;
        }

        .session-buttons {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 1rem;
        }

        .session-btn {
          flex: 1;
          padding: 0.9rem 1rem;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: 0.3s ease;
        }

        .btn-speaker {
          background: #4caf50;
          color: white;
        }

        .btn-speaker:hover {
          background: #3da444;
        }

        .btn-listener {
          background: #2196f3;
          color: white;
        }

        .btn-listener:hover {
          background: #1976d2;
        }

        @media (max-width: 500px) {
          .session-card {
            padding: 2rem;
          }
          .session-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="session-wrapper">
        <div className="session-logo">MidnightTalk</div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="session-card"
        >
          <h2 className="session-title">Audio Session</h2>

          <label className="session-label">Room ID</label>
          <input
            type="text"
            className="session-input"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter or share Room ID"
          />

          <div className="session-buttons">
            <button className="session-btn btn-speaker" onClick={handleStartSession}>
              Start as Speaker
            </button>
            <button className="session-btn btn-listener" onClick={handleJoinAsListener}>
              Join as Listener
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Session;
