import React from 'react';
import './LandingPage.css';

const StatsSection = () => {
  return (
    <section className="stats-section">
      <h2 className="stats-title">Seja mais um a participar do nosso amor!</h2>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">+30.000</div>
          <div className="stat-label">VOLUNTÁRIOS CADASTRADOS</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">+375</div>
          <div className="stat-label">ONGs CADASTRADAS</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">+100.000</div>
          <div className="stat-label">RAÍZES FORTALECIDAS</div>
        </div>
      </div>

      <h2 className="stats-footer-title">Trabalhe conosco e continue esse projeto!</h2>
      <p className="stats-footer-text">
        Seja mais um a participar do nosso amor, caminhando ao lado de quem acredita que cada ato de
        carinho constrói um futuro mais acolhedor para todos.
      </p>
    </section>
  );
};

export default StatsSection;
