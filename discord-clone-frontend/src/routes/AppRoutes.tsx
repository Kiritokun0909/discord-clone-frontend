// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/channels/*" element={<PrivateRoutes />} />
        
        <Route path="/*" element={<PublicRoutes />} />

      </Routes>
    </Router>
  );
};

export default AppRoutes;
