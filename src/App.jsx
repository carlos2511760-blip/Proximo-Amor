import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Novas páginas da reestruturação
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Opportunities from './pages/Opportunities';
import Login from './pages/Login';
import RegisterOng from './pages/RegisterOng';
import RegisterVolunteer from './pages/RegisterVolunteer';
import OngDashboard from './pages/OngDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Dashboards (possuem layout próprio) */}
        <Route path="/ong/dashboard" element={<OngDashboard />} />
        <Route path="/voluntario/dashboard" element={<VolunteerDashboard />} />
        
        {/* Páginas Públicas com o novo Layout (Header + Footer) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/sobre" element={<Layout><AboutUs /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/vagas" element={<Layout><Opportunities /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/cadastro/ong" element={<Layout><RegisterOng /></Layout>} />
        <Route path="/cadastro/voluntario" element={<Layout><RegisterVolunteer /></Layout>} />
        
        {/* Fallback opcional */}
        <Route path="*" element={<Layout><Home /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
