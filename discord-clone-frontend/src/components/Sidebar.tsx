import React, { useState } from "react";
import {
  Flex,
  VStack,
  Button,
  Text,
  Tooltip,
  Divider,
  Box,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { store } from "../redux/store";
import CreateCommunityModal from './modal/CreateCommunityModal'; // Import the CreateCommunityModal

export interface Server {
  id: number;
  name: string;
  icon: string;
}

interface SidebarProps {
  servers: Server[];
  selectedServer: Server | null;
  onServerClick: (server: Server) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  servers,
  selectedServer,
  onServerClick,
  onLogout,
}) => {
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
      <VStack spacing={2} align="stretch" w="full">
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
        <Divider my={2}/>
        {servers.map((server) => (
          <React.Fragment key={server.id}>
            <Tooltip label={server.name} placement="right">
              <Button
                w="50px"
                h="50px"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={
                  selectedServer?.id === server.id
                    ? "purple.500"
                    : server.id === 0
                    ? "blue.600"
                    : "gray.700"
                }
                _hover={{
                  bg:
                    server.id === 0
                      ? "blue.500"
                      : selectedServer?.id === server.id
                      ? "purple.600"
                      : "gray.600",
                }}
                onClick={() => onServerClick(server)}
                bgSize="cover"
                bgPosition="center"
                bgImage={'https://preview.redd.it/2b-chibi-sd-avatar-even-her-in-game-sd-model-looks-pretty-v0-el897nv9njmb1.jpg?width=640&crop=smart&auto=webp&s=6d4142e96aea03322e1cc4ed21138e0dcc583536'}
              >
              </Button>
            </Tooltip>
          </React.Fragment>
        ))}

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