
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { socket } from "../socket";
import {
  createPeer,
  addPeerTrackListeners,
  removePeerTrackListeners,
} from "../peer";

const Room = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const role = location.state?.role || "listener";

  const localAudioRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);

  useEffect(() => {
    const setupMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        localAudioRef.current.srcObject = stream;

        const peer = createPeer();
        stream.getTracks().forEach((track) => peer.addTrack(track, stream));

        setPeerConnection(peer);

        socket.emit("join-room", { roomId, role });

        socket.on("offer", async ({ offer, from }) => {
          await peer.setRemoteDescription(offer);
          const answer = await peer.createAnswer();
          await peer.setLocalDescription(answer);
          socket.emit("answer", { answer, to: from });
        });

        socket.on("answer", async ({ answer }) => {
          await peer.setRemoteDescription(answer);
        });

        socket.on("ice-candidate", async ({ candidate }) => {
          if (candidate) {
            await peer.addIceCandidate(candidate);
          }
        });

        peer.onicecandidate = (e) => {
          if (e.candidate) {
            socket.emit("ice-candidate", { candidate: e.candidate, roomId });
          }
        };

        peer.ontrack = (event) => {
          remoteAudioRef.current.srcObject = event.streams[0];
        };
      } catch (error) {
        console.error("Error setting up media:", error);
      }
    };

    setupMedia();

    return () => {
      if (peerConnection) {
        removePeerTrackListeners(peerConnection);
        peerConnection.close();
      }
      socket.disconnect();
    };
  }, [roomId]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Audio Room: {roomId}</h2>
      <p>Role: {role}</p>

      <div>
        <h4>Local Audio</h4>
        <audio ref={localAudioRef} autoPlay controls muted />
      </div>

      <div>
        <h4>Remote Audio</h4>
        <audio ref={remoteAudioRef} autoPlay controls />
      </div>
    </div>
  );
};

export default Room;
