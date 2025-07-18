import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useChatSocket } from '../hooks/useChatSocket';
import { VoiceCall } from '../components/VoiceCall';

const ChatRoom = () => {
  const { roomId } = useParams();
  const token = localStorage.getItem('token');
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const {
    socket,
    messages = [],
    sendMessage,
    isConnected,
  } = useChatSocket(token, roomId);

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed && sendMessage) {
      sendMessage(trimmed);
      setInput('');
    }
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chat Room - {roomId}</h2>

      {!isConnected && (
        <p style={styles.warning}>🔌 Connecting to socket...</p>
      )}

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong style={styles.sender}>{msg.sender || 'Anonymous'}:</strong> {msg.message}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputRow}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} style={styles.sendButton}>
          Send
        </button>
      </div>

      {socket && isConnected && (
        <div style={{ marginTop: '30px' }}>
          <VoiceCall socket={socket} roomId={roomId} />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '90%',
    maxHeight: '90vh',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#1e1e1e',
    color: '#fff',
    borderRadius: '8px',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  },
  title: {
    fontSize: '22px',
    marginBottom: '16px',
    color: '#e74c3c',
  },
  warning: {
    color: '#f39c12',
    marginBottom: '10px',
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
    lineHeight: '1.5',
  },
  sender: {
    color: '#e67e22',
  },
  inputRow: {
    display: 'flex',
    gap: '8px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '4px',
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
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default ChatRoom;
