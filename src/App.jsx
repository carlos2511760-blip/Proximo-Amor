import React from 'react';
<<<<<<< Updated upstream
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import FAQ from './pages/FAQ';
import Opportunities from './pages/Opportunities';
import Login from './pages/Login';
import RegisterOng from './pages/RegisterOng';
import RegisterVolunteer from './pages/RegisterVolunteer';
import SelectRegister from './pages/SelectRegister';
import OngDashboard from './pages/OngDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
>>>>>>> Stashed changes

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< Updated upstream
        {/* Dashboards (layout próprio) */}
        <Route path="/ong/dashboard" element={<OngDashboard />} />
        <Route path="/voluntario/dashboard" element={<VolunteerDashboard />} />

        {/* Páginas sem header/footer (auth flow) */}
        <Route path="/cadastro" element={<SelectRegister />} />
        <Route path="/cadastro/ong" element={<Layout><RegisterOng /></Layout>} />
        <Route path="/cadastro/voluntario" element={<Layout><RegisterVolunteer /></Layout>} />

        {/* Páginas Públicas com Layout (Header + Footer) */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/sobre" element={<Layout><AboutUs /></Layout>} />
        <Route path="/faq" element={<Layout><FAQ /></Layout>} />
        <Route path="/vagas" element={<Layout><Opportunities /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />

        {/* Fallback */}
        <Route path="*" element={<Layout><Home /></Layout>} />
=======
        <Route path="/" element={<Home />} />
>>>>>>> Stashed changes
      </Routes>
    </Router>
  );
}

export default App;
