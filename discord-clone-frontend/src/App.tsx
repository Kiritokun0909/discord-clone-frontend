import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Outlet,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";

import ProfilePage from "./pages/ProfilePage";
import ServerPage from "./pages/ServerPage";

import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import HomeLayout from "./layouts/HomeLayout";
import ChatLayout from "./layouts/ChatLayout";
import Sidebar from "./components/Sidebar";

const HeaderFooterWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const showHeaderFooter = [
    "/",
    "/privacy",
    "/terms",
    "/login",
    "/register",
  ].includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-700">
        <HeaderFooterWrapper>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              <Route
                path="/login"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <LoginPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <ProtectedRoute requireAuth={false}>
                    <RegisterPage />
                  </ProtectedRoute>
                }
              />

              <Route element={<HomeLayout />}>
                <Route
                  path="/channels/@me"
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route element={<ChatLayout main={<Outlet />} />}>
                  <Route
                    path="/channels/:serverId"
                    element={
                      <ProtectedRoute requireAuth={true}>
                        <ServerPage />
                      </ProtectedRoute>
                    }
                  />
                </Route>
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute requireAuth={true}>
                      <ProfilePage />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </HeaderFooterWrapper>
      </div>
    </Router>
  );
}

export default App;
