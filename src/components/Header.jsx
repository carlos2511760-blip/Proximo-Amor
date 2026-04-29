import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const base = import.meta.env.BASE_URL;

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header-logo">
        <img src={`${base}icons/logoBBG.png`} alt="Proximo Amor" onError={(e) => { e.target.style.display = 'none'; }} />
      </div>
      <nav className="header-nav">
        <a href="#enraizar">Enraizar</a>
        <a href="#quem-somos">Quem somos</a>
        <a href="#faq">FAQ</a>
        <a href="#voluntario">Quero ser voluntário!</a>
        <a href="#ong">Quero encontrar voluntários!</a>
      </nav>
      <div className="header-actions">
        <button onClick={() => navigate('/auth')} className="btn-secondary">Login</button>
        <button className="btn-secondary">Doe agora</button>
      </div>
    </header>
  );
};

export default Header;
