import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OngDashboard from './pages/OngDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/volunteer-dashboard" element={<VolunteerDashboard />} />
        <Route path="/ong-dashboard" element={<OngDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
