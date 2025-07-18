import React, { useState } from 'react';
import { useChatSocket } from '../hooks/useChatSocket';
import { VoiceCall } from '../components/VoiceCall';

export const ChatRoom = ({ token, roomId }) => {
  const [input, setInput] = useState('');
  const { socket, messages, sendMessage } = useChatSocket(token, roomId);

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-red-500">MidnightTalk Room</h2>

      <div className="h-64 bg-gray-800 rounded p-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm mb-2">
            <span className="text-red-400 font-bold">{msg.sender}:</span> {msg.message}
          </div>
        ))}
      </div>

      <div className="flex mt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-l bg-gray-700 text-white"
          placeholder="Type something..."
        />
        <button onClick={handleSend} className="bg-red-500 px-4 text-white rounded-r">
          Send
        </button>
      </div>

      {socket && <VoiceCall socket={socket} roomId={roomId} />}
    </div>
  );
};
