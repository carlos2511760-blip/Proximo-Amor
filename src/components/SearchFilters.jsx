import React from 'react';
import { ChevronDown } from 'lucide-react';
import './LandingPage.css';

const SearchFilters = () => {
  return (
    <section className="filters-section">
      <h2 className="filters-title">ou busque raízes por...</h2>
      <div className="filters-buttons">
        <button className="btn-filter">
          <ChevronDown size={24} /> Causas
        </button>
        <button className="btn-filter">
          <ChevronDown size={24} /> Áreas
        </button>
      </div>
    </section>
  );
};

export default SearchFilters;
