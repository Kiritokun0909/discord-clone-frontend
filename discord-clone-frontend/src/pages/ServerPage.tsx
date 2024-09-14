import React, { useState, useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  Button,
  Text,
  Tooltip,
  Divider,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { ChatIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";

interface Server {
  id: number;
  name: string;
  icon: string;
}

const servers: Server[] = [
  { id: 0, name: "Me", icon: "D" }, // Discord logo representation
  { id: 1, name: "Server 1", icon: "🌟" },
  { id: 2, name: "Server 2", icon: "🚀" },
  { id: 3, name: "Server 3", icon: "🌈" },
];

const ServerPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { serverId } = useParams<{ serverId: string }>();

  useEffect(() => {
    if (serverId) {
      const server = servers.find((s) => s.id === parseInt(serverId));
      if (server) {
        setSelectedServer(server);
      } else {
        // If invalid serverId, default to the first server
        setSelectedServer(servers[0]);
        navigate(`/channels/${servers[0].id}`);
      }
    } else {
      // If no serverId in URL, default to the first server
      setSelectedServer(servers[0]);
      navigate(`/channels/${servers[0].id}`);
    }
  }, [serverId, navigate]);

  const handleServerClick = (server: Server) => {
    setSelectedServer(server);
    navigate(`/channels/${server.id}`);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <Flex h="100vh" bg="gray.800" color="white">
      {/* Sidebar */}
      <Flex
        w="80px"
        bg="gray.900"
        p={3}
        flexDirection="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <VStack spacing={2} align="stretch" w="full">
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
                  onClick={() => handleServerClick(server)}
                >
                  <Box display="flex" justifyContent="center" alignItems="center" width="100%" height="100%">
                    {server.id === 0 ? (
                      <Text fontSize="2xl" fontWeight="bold" mt="0.3em">M</Text>
                    ) : (
                      <Text fontSize="2xl" mt="0.3em">{server.icon}</Text>
                    )}
                  </Box>
                </Button>
              </Tooltip>
              {server.id === 0 && <Divider my={2} />}
            </React.Fragment>
          ))}
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
            onClick={handleLogout}
          >
            <ChevronRightIcon />
          </Button>
        </Tooltip>
      </Flex>

      {/* Main content */}
      <Box flex={1} p={6} overflowY="auto">
        {selectedServer ? (
          <Heading as="h2" size="xl" mb={4}>
            {selectedServer.id === 0
              ? `Welcome, ${user.username}!`
              : `Welcome to ${selectedServer.name}!`}
          </Heading>
        ) : (
          <Heading as="h2" size="xl" mb={4}>
            Select a server to get started
          </Heading>
        )}
        <Text>Here you can manage your servers, channels, and messages.</Text>
      </Box>
    </Flex>
  );
};

export default ServerPage;
