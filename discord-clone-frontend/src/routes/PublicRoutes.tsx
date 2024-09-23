// src/routes/PublicRoutes.tsx
import { Route, Routes, Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

import Header from "../components/site/Header";
import Footer from "../components/site/Footer";

import HomePage from "../pages/site/HomePage";
import PrivacyPage from "../pages/site/PrivacyPage";
import TermsPage from "../pages/site/TermsPage";
import LoginPage from "../pages/site/LoginPage";
import RegisterPage from "../pages/site/RegisterPage";
import NotFoundPage from "../pages/site/NotFoundPage";

const PublicRoutes = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Redirect logged-in users to /channels/@me if they try to access login or register */}
        {isLoggedIn ? (
          <>
            <Route path="/login" element={<Navigate to="/channels/@me" />} />
            <Route path="/register" element={<Navigate to="/channels/@me" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </>
        )}

        {/* Catch-all route for Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default PublicRoutes;
