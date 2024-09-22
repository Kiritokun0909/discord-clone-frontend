import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

type ChatLayoutProps = {
  main: React.ReactNode;
};

const ChatLayout: React.FC<ChatLayoutProps> = ({ main }) => {
  return (
    <Flex h="100vh">
      <Box w="300px" bg="gray.700" py={4} px={2}>
        <Sidebar onLogout={() => {}} onServerClick={() => {}} />
      </Box>
      <Box flex={1} overflowY="auto" py={4} px={6}>
        {main}
      </Box>
    </Flex>
  );
};

export default ChatLayout;
