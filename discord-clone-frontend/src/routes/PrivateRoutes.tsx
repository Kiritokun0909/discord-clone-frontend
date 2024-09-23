// src/routes/PrivateRoutes.tsx
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import CommunityPage from "../pages/community/CommunityPage";

const PrivateRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return isLoggedIn ? (
    <Routes>
      <Route path="/@me" element={<CommunityPage />}/>
      <Route path="/:serverId" element={<CommunityPage />}/>
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
