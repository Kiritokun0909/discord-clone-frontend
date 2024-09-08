import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useAppSelector } from './hooks/reduxHooks';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ServerPage from './pages/ServerPage';

import NotFoundPage from './pages/NotFoundPage';

const HeaderFooterWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const showHeaderFooter = ['/', '/privacy', '/terms', '/login', '/register'].includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-700">
        <HeaderFooterWrapper>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />

              
              <Route path="/channels/@me" element={<ServerPage />} />
              <Route path="/channels/:serverId" element={<ServerPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </HeaderFooterWrapper>
      </div>
    </Router>
  );
}

export default App;
