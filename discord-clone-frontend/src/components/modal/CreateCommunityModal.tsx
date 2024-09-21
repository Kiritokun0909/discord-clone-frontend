import React, { useState } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import { uploadMedia } from "../../api/media";
import { showToast } from "../../utils/toast";

const CreateCommunityModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [communityImage, setCommunityImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      try {
        setCommunityImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        setIsUploading(true); // Start uploading
        await uploadMedia(file);
        setIsUploading(false); // Finished uploading
        showToast({
          type: "success",
          title: "Image uploaded successfully",
          context: "",
        });
      } catch (error) {
        showToast({
          type: "error",
          title: "Error uploading image",
          context: "",
        });
      }
    }
  };

  const handleSubmit = () => {
    // Handle community creation logic here
    console.log("Community Name:", communityName);
    console.log("Community Description:", communityDescription);
    console.log("Community Image:", communityImage);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.900" maxW="lg" mx="auto">
        <ModalHeader color="white">Create Community</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {imagePreview && (
            <Flex justify="center" mb={4}>
              {isUploading ? (
                <Spinner
                  size="lg"
                  color="blue.500"
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                />
              ) : (
                <Image
                  src={imagePreview}
                  alt="Community Image Preview"
                  boxSize="200px"
                  objectFit="cover"
                />
              )}
            </Flex>
          )}

          <FormControl isRequired>
            <FormLabel color="gray.300">Community Name</FormLabel>
            <Input
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              placeholder="Enter community name"
              bg="gray.700"
              color="gray.300"
              border="1px solid gray.600"
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel color="gray.300">Community Description</FormLabel>
            <Textarea
              value={communityDescription}
              onChange={(e) => setCommunityDescription(e.target.value)}
              placeholder="Enter community description"
              bg="gray.700"
              color="gray.300"
              border="1px solid gray.600"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel color="gray.300">Community Image</FormLabel>
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
                <Text color="gray.400">Click or drag to upload image</Text>
              </label>
            </Box>
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <HStack spacing={4}>
            <Button colorScheme="blue" onClick={handleSubmit}>
              <Text color="white">Create Community</Text>
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
