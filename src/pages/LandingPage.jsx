import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import JobsSection from '../components/JobsSection';
import StatsSection from '../components/StatsSection';

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Header />
      <Hero />
      <SearchFilters />
      <JobsSection />
      <StatsSection />
    </div>
  );
};

export default LandingPage;
