import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useChatSocket } from '../hooks/useChatSocket';
import { VoiceCall } from '../components/VoiceCall';

const ChatRoom = () => {
  const { roomId } = useParams();
  const token = localStorage.getItem('token');
  const [input, setInput] = useState('');

  const { socket, messages = [], sendMessage } = useChatSocket(token, roomId);

  const handleSend = () => {
    if (input.trim() && sendMessage) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chat Room - {roomId}</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong style={{ color: '#e74c3c' }}>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>

      {/* ✅ Safe render only if socket is connected */}
      {socket && <VoiceCall socket={socket} roomId={roomId} />}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '22px',
    marginBottom: '16px',
  },
  chatBox: {
    height: '300px',
    overflowY: 'auto',
    backgroundColor: '#2c2c2c',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '16px',
  },
  message: {
    marginBottom: '10px',
    fontSize: '14px',
  },
  inputRow: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #444',
    outline: 'none',
    fontSize: '14px',
    backgroundColor: '#333',
    color: '#fff',
  },
  sendButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ChatRoom;
