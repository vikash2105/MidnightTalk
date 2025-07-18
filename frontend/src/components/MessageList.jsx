import React from 'react';

const MessageList = ({ messages }) => {
  return (
    <div className="h-[70vh] overflow-y-auto p-4">
      {messages.map((msg, idx) => (
        <div key={idx} className={`mb-2 ${msg.isMe ? "text-right" : "text-left"}`}>
          <span className="inline-block bg-gray-200 text-black px-3 py-1 rounded-lg">
            {msg.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
