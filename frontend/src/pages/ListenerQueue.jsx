import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListenerQueue = () => {
  const [requests, setRequests] = useState([]);
  const listenerId = localStorage.getItem('userId'); // assuming login stores this

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(`https://your-backend-url.com/api/listener/queue/${listenerId}`);
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching call requests:', err);
      }
    };

    fetchRequests();
    const interval = setInterval(fetchRequests, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, [listenerId]);

  const handleAccept = async (roomId) => {
    try {
      await axios.post(`https://your-backend-url.com/api/room/accept`, {
        roomId,
        listenerId
      });
      window.location.href = `/room/${roomId}`;
    } catch (err) {
      console.error('Error accepting room:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Incoming Requests</h2>

      {requests.length === 0 ? (
        <p>No active requests.</p>
      ) : (
        <ul>
          {requests.map((req, index) => (
            <li key={index} style={styles.card}>
              <p><strong>User:</strong> {req.userName}</p>
              <p><strong>Topic:</strong> {req.topic || 'General Talk'}</p>
              <p><strong>Time:</strong> {new Date(req.createdAt).toLocaleTimeString()}</p>
              <button onClick={() => handleAccept(req.roomId)} style={styles.button}>
                Accept Request
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '700px',
    margin: 'auto',
    fontFamily: 'Arial',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default ListenerQueue;
