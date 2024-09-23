import React, { useEffect } from "react";

interface ChatAreaProps {
  channel: number ;
}

const ChatArea: React.FC<ChatAreaProps> = ({ channel }) => {
  return (
    <div>
      <h1>Chat for Channel {channel}</h1>
    </div>
  );
};

export default ChatArea;
