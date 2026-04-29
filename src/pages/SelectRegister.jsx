import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, User } from 'lucide-react';

const SelectRegister = () => {
  return (
    <div className="select-reg-page">
      <div className="select-reg-logo">
        <img src="/favicon.svg" alt="Próximo Amor" className="select-reg-logo-img" />
        <span className="select-reg-logo-text">Próximo Amor</span>
      </div>
      <div className="select-reg-cards">
        <div className="select-reg-card">
          <div className="select-reg-icon-wrap select-reg-icon-ong">
            <Building2 size={36} color="white" />
          </div>
          <h2 className="select-reg-card-title">Seja um galho</h2>
          <p className="select-reg-card-desc">Preciso de voluntários engajados para meus projetos e iniciativas.</p>
          <Link to="/cadastro/ong" className="select-reg-btn">Iniciar</Link>
        </div>

        <div className="select-reg-card">
          <div className="select-reg-icon-wrap select-reg-icon-vol">
            <User size={36} color="white" />
          </div>
          <h2 className="select-reg-card-title">Seja um voluntário</h2>
          <p className="select-reg-card-desc">Quero dedicar meu tempo e talento para causas sociais.</p>
          <Link to="/cadastro/voluntario" className="select-reg-btn">Começar</Link>
        </div>
      </div>
    </div>
  );
};

export default SelectRegister;
