import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Session = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState(() => {
    // Generate random 6-digit room id on load
    return Math.floor(100000 + Math.random() * 900000).toString();
  });

  const handleStartSession = () => {
    if (!roomId.trim()) {
      alert("Please enter a Room ID");
      return;
    }

    navigate(`/room/${roomId}`, { state: { role: "speaker" } });
  };

  const handleJoinAsListener = () => {
    if (!roomId.trim()) {
      alert("Enter a valid Room ID");
      return;
    }

    navigate(`/room/${roomId}`, { state: { role: "listener" } });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Audio Session</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Room ID</label>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter or share Room ID"
          style={styles.input}
        />
      </div>

      <div style={styles.buttonRow}>
        <button onClick={handleStartSession} style={styles.startBtn}>
          Start as Speaker
        </button>
        <button onClick={handleJoinAsListener} style={styles.joinBtn}>
          Join as Listener
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "60px auto",
    padding: "20px",
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: "10px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #555",
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontSize: "14px",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  startBtn: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  joinBtn: {
    padding: "10px 20px",
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Session;
