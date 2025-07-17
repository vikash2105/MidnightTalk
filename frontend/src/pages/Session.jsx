// /frontend/src/pages/Session.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Session = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [walletBalance, setWalletBalance] = useState(100); // dummy data
  const [kycUploaded, setKycUploaded] = useState(false);
  const [isListenerQueue, setIsListenerQueue] = useState(false);

  const handleStartSession = () => {
    if (!kycUploaded) {
      alert("Please upload KYC before starting session.");
      return;
    }

    if (!roomId.trim()) {
      alert("Please enter a Room ID");
      return;
    }

    navigate(`/room/${roomId}`, { state: { role: "host" } });
  };

  const handleJoinAsListener = () => {
    if (!roomId.trim()) {
      alert("Enter a valid Room ID");
      return;
    }

    navigate(`/room/${roomId}`, { state: { role: "listener" } });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Start Audio Session</h2>

      <div>
        <label>Room ID:</label>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Enter room ID"
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={handleStartSession}>Start as Host</button>
        <button onClick={handleJoinAsListener} style={{ marginLeft: "1rem" }}>
          Join as Listener
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h4>Wallet: ₹{walletBalance}</h4>
        <button onClick={() => alert("Wallet feature coming soon!")}>
          View Earnings
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h4>KYC Status: {kycUploaded ? "Uploaded" : "Not Uploaded"}</h4>
        <input
          type="file"
          onChange={() => setKycUploaded(true)}
          accept=".pdf,.jpg,.jpeg,.png"
        />
      </div>
    </div>
  );
};

export default Session;
