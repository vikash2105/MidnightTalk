import React, { useEffect, useRef } from 'react';

export const VoiceCall = ({ socket, roomId }) => {
  const localAudio = useRef(null);
  const remoteAudio = useRef(null);
  const peer = useRef(null);

  useEffect(() => {
    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localAudio.current.srcObject = stream;

      const p = new RTCPeerConnection();
      stream.getTracks().forEach((track) => p.addTrack(track, stream));

      p.ontrack = (e) => {
        remoteAudio.current.srcObject = e.streams[0];
      };

      p.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('ice-candidate', { roomId, candidate: e.candidate });
        }
      };

      peer.current = p;

      const offer = await p.createOffer();
      await p.setLocalDescription(offer);
      socket.emit('offer', { roomId, offer });
    };

    socket.on('offer', async (offer) => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localAudio.current.srcObject = stream;

      const p = new RTCPeerConnection();
      stream.getTracks().forEach((track) => p.addTrack(track, stream));

      p.ontrack = (e) => {
        remoteAudio.current.srcObject = e.streams[0];
      };

      p.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('ice-candidate', { roomId, candidate: e.candidate });
        }
      };

      peer.current = p;
      await p.setRemoteDescription(offer);
      const answer = await p.createAnswer();
      await p.setLocalDescription(answer);
      socket.emit('answer', { roomId, answer });
    });

    socket.on('answer', (answer) => {
      peer.current.setRemoteDescription(answer);
    });

    socket.on('ice-candidate', (candidate) => {
      peer.current.addIceCandidate(candidate);
    });

    start();
  }, [socket, roomId]);

  return (
    <div style={styles.callContainer}>
      <audio ref={localAudio} autoPlay muted />
      <audio ref={remoteAudio} autoPlay />
      <p style={styles.status}>Voice call active...</p>
    </div>
  );
};

const styles = {
  callContainer: {
    marginTop: '20px',
    backgroundColor: '#2d2d2d',
    padding: '10px',
    borderRadius: '4px',
    color: '#aaa',
    textAlign: 'center',
  },
  status: {
    fontSize: '14px',
    marginTop: '10px',
  },
};
