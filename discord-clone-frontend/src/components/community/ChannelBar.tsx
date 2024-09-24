import React, { useEffect, useState } from "react";
import { CommunityResponse } from "../../api/community"; // Assuming this API exists
import { getCommunityDetails } from "../../api/channel";
import { FaMicrophone, FaHeadphones, FaCog } from "react-icons/fa"; // Import microphone, headphone, and settings icons

interface ChannelBarProps {
  community: CommunityResponse;
  onChannelClick: (channel: number) => void;
}

interface ChannelType {
  typeName: string;
  channels: { id: number; name: string }[];
}

const ChannelBar: React.FC<ChannelBarProps> = ({ community, onChannelClick }) => {
  const [channelTypes, setChannelTypes] = useState<ChannelType[]>([]);
  const [user] = useState({ username: "JohnDoe", avatarUrl: null }); // Example user data

  // States for microphone and headphones toggle
  const [isMicOn, setIsMicOn] = useState(false);
  const [isHeadphonesOn, setIsHeadphonesOn] = useState(false);

  useEffect(() => {
    // Fetch community details by ID
    const fetchCommunityDetails = async () => {
      try {
        const response = await getCommunityDetails(parseInt(community.id, 10));
        setChannelTypes(response.channelTypes);
      } catch (error) {
        console.error("Error fetching community details", error);
      }
    };

    fetchCommunityDetails();
  }, [community.id]);

  // Toggle microphone on/off
  const toggleMicrophone = () => {
    setIsMicOn((prevState) => !prevState);
  };

  // Toggle headphones on/off
  const toggleHeadphones = () => {
    setIsHeadphonesOn((prevState) => !prevState);
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col justify-between h-full p-3">
      <div>
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

      {/* User Info Section */}
      <div className="flex items-center justify-between bg-gray-900 p-2 rounded mt-4">
        {/* User Avatar */}
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-2">
            {/* If user has an avatarUrl, show it; otherwise show the first letter of the username */}
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-xl font-bold text-white">
                {user.username.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Username */}
          <span className="text-sm font-semibold">{user.username}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Microphone Icon (Toggles on/off) */}
          <button
            className={`p-2 rounded-full ${isMicOn ? 'bg-green-600' : 'bg-gray-700'}`}
            onClick={toggleMicrophone}
          >
            <FaMicrophone className="text-white w-4 h-4" />
          </button>

          {/* Headphones Icon (Toggles on/off) */}
          <button
            className={`p-2 rounded-full ${isHeadphonesOn ? 'bg-green-600' : 'bg-gray-700'}`}
            onClick={toggleHeadphones}
          >
            <FaHeadphones className="text-white w-4 h-4" />
          </button>

          {/* Settings Icon */}
          <button
            className="p-2 rounded-full bg-gray-700"
            style={{ transition: 'filter 0.2s' }}
          >
            <FaCog className="text-white w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChannelBar;
