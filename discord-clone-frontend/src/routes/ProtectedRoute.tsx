import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth,
}) => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  console.log(isLoggedIn);
  const location = useLocation();

  if (requireAuth && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!requireAuth && isLoggedIn) {
    return <Navigate to="/channels/@me" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
