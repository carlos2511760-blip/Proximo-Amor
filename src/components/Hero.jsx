import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';

const base = import.meta.env.BASE_URL;

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${base}homeBG.jpeg)` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          {t('hero_title')}
        </h1>
        <h2 className="hero-subtitle">
          {t('hero_subtitle')}
        </h2>
        
        <div className="hero-search">
          <Search size={24} className="hero-search-icon" />
          <input 
            type="text" 
            placeholder={t('hero_search_placeholder')} 
            className="hero-search-input"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
