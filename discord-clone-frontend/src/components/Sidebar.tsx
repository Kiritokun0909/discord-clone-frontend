import React, { useState, useEffect } from "react";
import {
  Flex,
  VStack,
  Button,
  Text,
  Tooltip,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { store } from "../redux/store";
import CreateCommunityModal from './modal/CreateCommunityModal'; // Import the CreateCommunityModal
import { CommunityResponse, getCommunities } from "../api/community";
import { showToast } from "../utils/toast";

export interface Server {
  id: number;
  name: string;
  icon: string;
}

interface SidebarProps {
  onServerClick: (server: CommunityResponse) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onServerClick,
  onLogout,
}) => {
  const [selectedCommunity, setselectedCommunity] = useState<CommunityResponse | null>(null);
  const [communities, setCommunities] = useState<CommunityResponse[]>([]);
  const fetchCommunities = async () => {
    try {
      const communitiesResponse = await getCommunities();
      setCommunities(communitiesResponse);
    } catch (error : any) {
      showToast({ type: 'error', title: 'Error fetching communities', context: error.message });
    }
  };
  useEffect(() => {
    fetchCommunities();
  }, []); // Call the fetchCommunities function only once when the component mounts

  const user = store.getState().user;
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  
  function openCreateCommunityModal(): void {
    setIsModalOpen(true); // Open the modal
  }

  function closeCreateCommunityModal(): void {
    setIsModalOpen(false); // Close the modal
  }

  return (
    <Flex
      w="80px"
      bg="gray.900"
      p="12px 12px 0 12px"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <VStack gap={4} align="stretch" w="full">
        <Button
          w="50px"
          h="50px"
          borderRadius="full"
          bg="blue.500"
          color="white"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="2xl" fontWeight="bold" mt="0.3em">{user.username?.charAt(0).toUpperCase()}</Text>
        </Button>
        <Divider my={1}/>
        {
          communities.length > 0 && communities.map((community) => (
            <React.Fragment key={community.id}>
              <Tooltip label={community.name} placement="right">
                <Button
                  w="50px"
                  h="50px"
                  borderRadius="full"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={selectedCommunity?.id === community.id ? "purple.500" : "gray.700"}
                  _hover={{
                    filter: "brightness(0.5)",
                  }}
                  _focus={{
                    boxShadow: "0 0 0 2px white"
                  }}
                  _active={{
                    bg: "purple.600",
                    transform: "scale(0.95)"
                  }}
                  onClick={() => onServerClick(community)}
                  bgImage={community.imageUrl ? `url(${community.imageUrl})` : undefined}
                  bgSize={community.imageUrl ? "cover" : undefined}
                  bgPosition={community.imageUrl ? "center" : undefined}
                  bgRepeat="no-repeat"
                >
                  {!community.imageUrl && (
                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color="white"
                    >
                      {community.name.charAt(0).toUpperCase()}
                    </Text>
                  )}
                </Button>
              </Tooltip>
            </React.Fragment>
          ))
        }

      <Tooltip label="Create Community" placement="right">
        <Button
          w="48px"
          h="48px"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="green.600"
          _hover={{ bg: "red.700" }}
          onClick={openCreateCommunityModal} // Open the create community modal
          mt={3}
        >
          <Icon as={AddIcon} fontSize={"3xl"}/>
        </Button>
      </Tooltip>
      </VStack>

      {/* Logout button */}
      <Tooltip label="Logout" placement="right">
        <Button
          w="48px"
          h="48px"
          borderRadius="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="2xl"
          bg="red.600"
          _hover={{ bg: "red.700" }}
          onClick={onLogout}
          mb={3}
        >
          <ChevronRightIcon />
        </Button>
      </Tooltip>

      {/* Create Community Modal */}
      <CreateCommunityModal isOpen={isModalOpen} onClose={closeCreateCommunityModal} />
    </Flex>
  );
};

export default Sidebar;