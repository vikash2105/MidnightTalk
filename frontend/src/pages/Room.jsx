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

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

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

        // Receive chat messages
        socket.on("message", ({ sender, content, time }) => {
          setMessages((prev) => [...prev, { sender, content, time }]);
        });
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

  const sendMessage = () => {
    if (!message.trim()) return;

    const payload = {
      roomId,
      sender: role,
      content: message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("message", payload);
    setMessages((prev) => [...prev, payload]);
    setMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold">Room: {roomId}</h2>
        <p className="text-sm text-gray-500">Logged in as: {role}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[75%] px-4 py-2 rounded-xl ${
              msg.sender === role
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            <p className="text-sm">{msg.content}</p>
            <p className="text-xs text-right opacity-60">{msg.time}</p>
          </div>
        ))}
      </div>

      <div className="p-4 flex items-center bg-white border-t">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 px-4 py-2 rounded-full border mr-2"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>

      {/* Audio Elements */}
      <audio ref={localAudioRef} autoPlay controls muted className="hidden" />
      <audio ref={remoteAudioRef} autoPlay controls className="hidden" />
    </div>
  );
};

export default Room;
