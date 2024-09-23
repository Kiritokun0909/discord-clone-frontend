import React, { useEffect, useState } from "react";
import { CommunityResponse } from "../../api/community"; // Assuming this API exists
import { ChannelResponse, getCommunityDetails } from "../../api/channel";

interface ChannelBarProps {
  community: CommunityResponse;
  onChannelClick: (channel: number) => void;
}

interface ChannelType {
    typeName: string;
    channels: { id: number; name: string; }[];
  }


const ChannelBar: React.FC<ChannelBarProps> = ({ community, onChannelClick }) => {
  const [channelTypes, setChannelTypes] = useState<ChannelType[]>([]);

  // Fetch community details by ID
  const fetchCommunityDetails = async () => {
    try {
      const response = await getCommunityDetails(parseInt(community.id, 10));
      setChannelTypes(response.channelTypes);
    } catch (error) {
      console.error("Error fetching community details", error);
    }
  };

  useEffect(() => {
    fetchCommunityDetails();
  }, [community.id]);

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-3">
      <h2 className="text-xl font-bold mb-4">{community.name}</h2>
      
      {/* Display Channel Types and Channels */}
      {channelTypes.map((channelType) => (
        <div key={channelType.typeName} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{channelType.typeName}</h3>
          <div className="flex flex-col gap-2">
            {channelType.channels.map((channel) => (
              <button
                key={channel.id}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                onClick={() => onChannelClick(channel.id)}
              >
                {channel.name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChannelBar;
