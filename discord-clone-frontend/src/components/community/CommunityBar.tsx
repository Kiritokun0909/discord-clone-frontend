import React, { useState, useEffect } from "react";
import { store } from "../../redux/store";
import CreateCommunityModal from '../modal/CreateCommunityModal'; // Import the CreateCommunityModal
import { CommunityResponse, getCommunities } from "../../api/community";
import { showToast } from "../../utils/toast";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface CommunityBarProps {
  onServerClick: (server: CommunityResponse) => void;
  onLogout: () => void;
}

const CommunityBar: React.FC<CommunityBarProps> = ({
  onServerClick,
  onLogout,
}) => {
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityResponse | null>(null);
  const [hoveredCommunity, setHoveredCommunity] = useState<string | null>(null); // Track hovered community
  const [hoveredButton, setHoveredButton] = useState<string | null>(null); // Track hovered button
  const [communities, setCommunities] = useState<CommunityResponse[]>([]);
  
  const fetchCommunities = async () => {
    try {
      const communitiesResponse = await getCommunities();
      setCommunities(communitiesResponse);
    } catch (error: any) {
      showToast({ type: 'error', title: 'Error fetching communities', context: error.message });
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const user = store.getState().user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openCreateCommunityModal = () => setIsModalOpen(true);
  const closeCreateCommunityModal = () => setIsModalOpen(false);

  return (
    <div className="w-20 h-screen bg-gray-900 flex flex-col items-center justify-between p-3 relative">
      <div className="flex flex-col gap-4 items-center w-full">
        <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
          <span className="text-2xl font-bold">{user.username?.charAt(0).toUpperCase()}</span>
        </button>

        <div className="w-full h-px bg-gray-700 my-2" />

        {communities.length > 0 && communities.map((community) => (
          <div key={community.id} className="relative">
            <button
              className={`w-12 h-12 rounded-full ${selectedCommunity?.id === community.id ? 'bg-purple-500' : 'bg-gray-700'} flex items-center justify-center`}
              onClick={() => onServerClick(community)}
              onMouseEnter={() => setHoveredCommunity(community.name)} // Set hovered community name
              onMouseLeave={() => setHoveredCommunity(null)} // Clear hovered community name
              style={{
                backgroundImage: community.imageUrl ? `url(${community.imageUrl})` : undefined,
                backgroundSize: community.imageUrl ? 'cover' : undefined,
                backgroundPosition: community.imageUrl ? 'center' : undefined,
              }}
            >
              {!community.imageUrl && (
                <span className="text-2xl font-bold text-white">
                  {community.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>

            {/* Tooltip for community name on hover */}
            {hoveredCommunity === community.name && (
              <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1">
                {community.name}
              </div>
            )}
          </div>
        ))}

        {/* Create Community Button */}
        <div className="relative">
          <button
            className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center hover:bg-green-700"
            onClick={openCreateCommunityModal}
            onMouseEnter={() => setHoveredButton("Create Community")}
            onMouseLeave={() => setHoveredButton(null)}
          >
            <AddIcon className="w-6 h-6 text-white" />
          </button>

          {/* Tooltip for Create Community Button */}
          {hoveredButton === "Create Community" && (
            <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1">
              Create new community
            </div>
          )}
        </div>
      </div>

      {/* Logout Button */}
      <div className="relative">
        <button
          className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 mb-3"
          onClick={onLogout}
          onMouseEnter={() => setHoveredButton("Logout")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>

        {/* Tooltip for Logout Button */}
        {hoveredButton === "Logout" && (
          <div className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-sm rounded px-2 py-1">
            Logout
          </div>
        )}
      </div>

      {/* Create Community Modal */}
      <CreateCommunityModal isOpen={isModalOpen} onClose={closeCreateCommunityModal} />
    </div>
  );
};

export default CommunityBar;
