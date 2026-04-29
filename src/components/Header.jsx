import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import './LandingPage.css';

const base = import.meta.env.BASE_URL;

const Header = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-logo">
        <img src={`${base}icons/logoBBG.png`} alt="Proximo Amor" onError={(e) => { e.target.style.display = 'none'; }} />
      </div>
      <nav className="header-nav">
        <a href="#enraizar">{t('nav_root')}</a>
        <a href="#quem-somos">{t('nav_about')}</a>
        <a href="#faq">{t('nav_faq')}</a>
        <a href="#voluntario">{t('cta_volunteer_long')}</a>
        <a href="#ong">{t('cta_ong_long')}</a>
      </nav>
      <div className="header-actions">
        <select 
          onChange={(e) => i18n.changeLanguage(e.target.value)} 
          className="lang-select"
          defaultValue={i18n.language}
        >
          <option value="pt">PT</option>
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
        <button onClick={() => navigate('/auth')} className="btn-secondary">{t('nav_login')}</button>
        <button className="btn-secondary">{t('cta_donate')}</button>
      </div>
    </header>
  );
};

export default Header;
