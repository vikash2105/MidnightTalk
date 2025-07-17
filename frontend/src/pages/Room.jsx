import React, { useEffect, useState } from "react";
import socket from "../utils/socket";

const Room = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("receive-message", ({ message, sender }) => {
      setMessages(prev => [...prev, { message, sender }]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, [roomId]);

  const sendMessage = () => {
    socket.emit("send-message", { roomId, message: text });
    setText("");
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}><strong>{msg.sender}:</strong> {msg.message}</p>
        ))}
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Room;
