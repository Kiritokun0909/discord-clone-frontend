import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { CommunityResponse } from "../api/community";

const HomeLayout = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleServerClick = (server: CommunityResponse) => {
    navigate(`/channels/${server.id}`);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  return (
    <Flex h="100vh" bg="gray.800" color="white">
      <Sidebar
        onServerClick={handleServerClick}
        onLogout={handleLogout}
      />

      {/* Main content */}
      <Box flex={1} p={6} overflowY="auto">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default HomeLayout;
