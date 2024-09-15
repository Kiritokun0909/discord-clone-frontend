import { Flex, Box } from "@chakra-ui/react";
import Sidebar, { Server } from "../components/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { clearUser } from "../redux/slices/userSlice";

const HomeLayout = () => {
  const location = useLocation();
  const servers: Server[] = [
    { id: 1, name: "Server 1", icon: "🌟" },
    { id: 2, name: "Server 2", icon: "🚀" },
    { id: 3, name: "Server 3", icon: "🌈" },
  ];
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

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
      <Sidebar
        servers={servers}
        selectedServer={selectedServer}
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
