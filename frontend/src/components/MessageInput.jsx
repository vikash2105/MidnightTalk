import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 border rounded px-4 py-2"
      />
      <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
