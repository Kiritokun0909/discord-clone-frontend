import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

const ServerPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { serverId } = useParams<{ serverId: string }>();

  useEffect(() => {
    // ... existing useEffect code ...
  }, [serverId, navigate]);

  return (
    <>
      {/* Main content */}
      <Box flex={1} p={6} overflowY="auto">
      <Heading as="h2" size="xl" mb={4}>
            {serverId?.length === 0
              ? `Welcome, ${user.username}!`
              : `Welcome to ${serverId}!`}
          </Heading>
      </Box>
    </>
  );
};

export default ServerPage;