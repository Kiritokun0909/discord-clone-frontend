import React, { useState } from "react";

interface ChatAreaProps {
  channel: number;
}

// Mock data for the chat messages
const mockMessages = [
  {
    id: 1,
    username: "JohnDoe",
    message: "Hey everyone! How’s it going?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    username: "JaneDoe",
    message: "All good here! What about you?",
    timestamp: "10:32 AM",
  },
  {
    id: 3,
    username: "JohnDoe",
    message: "Doing well, just working on a project.",
    timestamp: "10:33 AM",
  },
  {
    id: 4,
    username: "RandomUser",
    message: "Same here, trying to debug something.",
    timestamp: "10:35 AM",
  },
];

const ChatArea: React.FC<ChatAreaProps> = ({ channel }) => {
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMessageData = {
      id: messages.length + 1,
      username: "You", // Mock current user as "You"
      message: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prevMessages) => [...prevMessages, newMessageData]);
    setNewMessage(""); // Clear the input after sending
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-4 w-full">
      {/* Channel Title */}
      <h1 className="text-2xl font-bold mb-4">Chat for Channel {channel}</h1>

      {/* Message List */}
      <div className="flex-grow overflow-y-auto mb-4 p-3 bg-gray-800 rounded">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3">
            <div className="flex justify-between">
              <span className="font-semibold">{msg.username}</span>
              <span className="text-sm text-gray-400">{msg.timestamp}</span>
            </div>
            <p className="text-sm text-gray-300">{msg.message}</p>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center bg-gray-700 rounded p-2">
        <input
          type="text"
          className="flex-grow p-2 text-black rounded"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
