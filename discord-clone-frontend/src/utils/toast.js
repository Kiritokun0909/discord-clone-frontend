import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const showToast = ({ type, title, context }) => {
  toast({
    title: title,
    description: context,
    status: type,
    duration: 3000,
    isClosable: true,
    position: "top-right"
  });
};