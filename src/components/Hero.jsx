import React from 'react';
import { Search } from 'lucide-react';
import './LandingPage.css';

const base = import.meta.env.BASE_URL;

const Hero = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${base}homeBG.jpeg)` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Somos uma iniciativa dedicada<br/>a transformar vidas por meio do voluntariado.
        </h1>
        <h2 className="hero-subtitle">
          Faça parte desse amor hoje!
        </h2>
        
        <div className="hero-search">
          <Search size={24} className="hero-search-icon" />
          <input 
            type="text" 
            placeholder="Busque por folhas, galhos, etc..." 
            className="hero-search-input"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
