import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearUser } from "../../redux/slices/userSlice";
import { CommunityResponse } from "../../api/community";

import CommunityBar from "../../components/community/CommunityBar";
import ChannelBar from "../../components/community/ChannelBar";
import ChatArea from "../../components/community//ChatArea";

const CommunityPage = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityResponse | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<number | null>(null);;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleServerClick = (community: CommunityResponse) => {
    setSelectedCommunity(community);
    setSelectedChannel(null); // Reset channel when selecting a new community
  };

  const handleChannelClick = (channelId: number) => {
    setSelectedChannel(channelId);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-700">
      {/* Communities List */}
      <CommunityBar onServerClick={handleServerClick} onLogout={handleLogout} />

      {/* Channels List (Visible when a community is selected) */}
      {selectedCommunity && (
        <ChannelBar
          community={selectedCommunity}
          onChannelClick={handleChannelClick}
        />
      )}

      {/* Chat Area (Visible when a channel is selected) */}
      {selectedChannel != null && (
        <ChatArea  
          channel={selectedChannel} 
        />
      )}
    </div>
  );
};

export default CommunityPage;
