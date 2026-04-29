import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ArrowLeft, Mail, Lock, User, Building2 } from 'lucide-react';
import './AuthPage.css';

const AuthPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('volunteer');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const roleParam = params.get('role');
    if (roleParam) setRole(roleParam);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    if (role === 'volunteer') navigate('/volunteer-dashboard');
    else navigate('/ong-dashboard');
  };

  return (
    <div className="auth-page">
      <button 
        onClick={() => navigate('/')}
        className="auth-back-btn"
      >
        <ArrowLeft size={20} /> Voltar ao início
      </button>

      <div className="glass auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Heart fill="var(--primary)" size={32} />
            <span>Próximo Amor</span>
          </div>
          <h2 className="auth-title">{isLogin ? 'Bem-vindo de volta' : 'Criar nova conta'}</h2>
          <p className="auth-subtitle">{isLogin ? 'Entre para continuar impactando vidas' : 'Junte-se à nossa rede de solidariedade'}</p>
        </div>

        {!isLogin && (
          <div className="auth-roles">
            <button 
              onClick={() => setRole('volunteer')}
              className={`auth-role-btn ${role === 'volunteer' ? 'active' : ''}`}
            >
              <User size={24} color={role === 'volunteer' ? 'var(--primary)' : 'var(--muted-foreground)'} />
              <span className="auth-role-text">Voluntário</span>
            </button>
            <button 
              onClick={() => setRole('ong')}
              className={`auth-role-btn ${role === 'ong' ? 'active' : ''}`}
            >
              <Building2 size={24} color={role === 'ong' ? 'var(--primary)' : 'var(--muted-foreground)'} />
              <span className="auth-role-text">ONG</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User size={18} className="input-icon" />
              <input type="text" placeholder="Seu nome completo" required className="auth-input" />
            </div>
          )}
          <div className="input-group">
            <Mail size={18} className="input-icon" />
            <input type="email" placeholder="Seu e-mail" required className="auth-input" />
          </div>
          <div className="input-group">
            <Lock size={18} className="input-icon" />
            <input type="password" placeholder="Sua senha" required className="auth-input" />
          </div>
          
          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            {isLogin ? 'Ainda não tem conta?' : 'Já possui uma conta?'}
            <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle-btn">
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
