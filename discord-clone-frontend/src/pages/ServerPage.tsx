import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHooks";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import { CommunityDetailResponse, getDetailCommunity } from "../api/community";
import { showToast } from "../utils/toast";

const ServerPage: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { serverId } = useParams<{ serverId: string }>();

  const fetchCommunityDetail = async () => {
    try {
      if (serverId !== undefined) {
        const data = await getDetailCommunity(serverId);
        console.log(data); 
      } else {
        showToast({
          type: "error",
          title: "Error",
          context: "Cannot fetch community detail",
        })
      }
    } catch (error : any) {
      showToast({
        type: "error",
        title: "Error",
        context: error.message,
      })
    }
    
  };

  useEffect(() => {
    fetchCommunityDetail();
  }, [serverId, navigate]);

  return (
    <>
      {/* Main content */}
      <Box flex={1} p={6} overflowY="auto">
      <Heading as="h2" size="xl" mb={4}>
            
      </Heading>
      </Box>
    </>
  );
};

export default ServerPage;