import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Wallet = () => {
  const [wallet, setWallet] = useState({ balance: 0, transactions: [] });
  const userId = localStorage.getItem('userId'); // Replace if using a token

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await axios.get(`https://your-backend-url.com/api/wallet/${userId}`);
        setWallet(res.data);
      } catch (err) {
        console.error('Error fetching wallet:', err);
      }
    };
    fetchWallet();
  }, [userId]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Wallet</h2>
      <p style={styles.balance}>Current Balance: ₹{wallet.balance}</p>

      <h3 style={styles.subHeading}>Transaction History</h3>
      {wallet.transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul>
          {wallet.transactions.map((txn, idx) => (
            <li key={idx} style={styles.transaction}>
              {txn.type} of ₹{txn.amount} on {new Date(txn.date).toLocaleString()}
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
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  balance: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  subHeading: {
    marginTop: '20px',
    fontSize: '18px',
  },
  transaction: {
    marginBottom: '10px',
  },
};

export default Wallet;
