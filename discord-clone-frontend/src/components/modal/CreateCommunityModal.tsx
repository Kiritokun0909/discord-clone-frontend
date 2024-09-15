import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Image,
  Box,
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';

const CreateCommunityModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [serverName, setServerName] = useState('');
  const [serverDescription, setServerDescription] = useState('');
  const [serverImage, setServerImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setServerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Handle server creation logic here
    console.log('Server Name:', serverName);
    console.log('Server Description:', serverDescription);
    console.log('Server Image:', serverImage);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.900" maxW="lg" mx="auto">
        <ModalHeader color="white">Create Server</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {imagePreview && (
            <Flex justify="center" mb={4}>
              <Image src={imagePreview} alt="Server Image Preview" boxSize="200px" objectFit="cover" />
            </Flex>
          )}
          <FormControl isRequired>
            <FormLabel color="gray.300">Server Name</FormLabel>
            <Input
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="Enter server name"
              bg="gray.700"
              color="gray.300"
              border="1px solid gray.600"
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel color="gray.300">Server Description</FormLabel>
            <Textarea
              value={serverDescription}
              onChange={(e) => setServerDescription(e.target.value)}
              placeholder="Enter server description"
              bg="gray.700"
              color="gray.300"
              border="1px solid gray.600"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color="gray.300">Server Image</FormLabel>
            <Box
              borderWidth={2}
              borderStyle="dashed"
              borderColor="gray.600"
              borderRadius="md"
              p={4}
              textAlign="center"
              cursor="pointer"
              _hover={{ bg: "gray.800" }}
              transition="all 0.3s"
            >
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                display="none"
                id="image-file-input"
              />
              <label htmlFor="image-file-input">
                <Text color="gray.400">
                  Click or drag to upload image
                </Text>
              </label>
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              <Text color="white">Create Server</Text>
            </Button>
            <Button variant="outline" colorScheme="blue" onClick={onClose}>
              <Text>Cancel</Text>
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCommunityModal;

