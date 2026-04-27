import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ArrowLeft, Mail, Lock, User, Building2 } from 'lucide-react';

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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--muted)', padding: '1rem' }}>
      <button 
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: 'var(--primary)', fontWeight: '600' }}
      >
        <ArrowLeft size={20} /> Voltar ao início
      </button>

      <div className="glass" style={{ width: '100%', maxWidth: '450px', padding: '3rem', borderRadius: '2rem', backgroundColor: 'var(--card)', boxShadow: 'var(--shadow)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '1rem' }}>
            <Heart fill="var(--primary)" size={32} />
            <span>Próximo Amor</span>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700' }}>{isLogin ? 'Bem-vindo de volta' : 'Criar nova conta'}</h2>
          <p style={{ color: 'var(--muted-foreground)' }}>{isLogin ? 'Entre para continuar impactando vidas' : 'Junte-se à nossa rede de solidariedade'}</p>
        </div>

        {!isLogin && (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button 
              onClick={() => setRole('volunteer')}
              style={{ flex: 1, padding: '1rem', borderRadius: '1rem', border: role === 'volunteer' ? '2px solid var(--primary)' : '2px solid var(--border)', backgroundColor: role === 'volunteer' ? 'rgba(13, 148, 136, 0.05)' : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
            >
              <User size={24} color={role === 'volunteer' ? 'var(--primary)' : 'var(--muted-foreground)'} />
              <span style={{ fontWeight: '600', color: role === 'volunteer' ? 'var(--primary)' : 'var(--muted-foreground)' }}>Voluntário</span>
            </button>
            <button 
              onClick={() => setRole('ong')}
              style={{ flex: 1, padding: '1rem', borderRadius: '1rem', border: role === 'ong' ? '2px solid var(--primary)' : '2px solid var(--border)', backgroundColor: role === 'ong' ? 'rgba(13, 148, 136, 0.05)' : 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
            >
              <Building2 size={24} color={role === 'ong' ? 'var(--primary)' : 'var(--muted-foreground)'} />
              <span style={{ fontWeight: '600', color: role === 'ong' ? 'var(--primary)' : 'var(--muted-foreground)' }}>ONG</span>
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!isLogin && (
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
              <input type="text" placeholder="Seu nome completo" required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }} />
            </div>
          )}
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
            <input type="email" placeholder="Seu e-mail" required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
            <input type="password" placeholder="Sua senha" required style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', borderRadius: '0.75rem', border: '1px solid var(--border)', outline: 'none' }} />
          </div>
          
          <button type="submit" style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '1rem', marginTop: '1rem', boxShadow: '0 4px 6px -1px rgba(13, 148, 136, 0.4)' }}>
            {isLogin ? 'Entrar' : 'Criar conta'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--muted-foreground)' }}>
            {isLogin ? 'Ainda não tem conta?' : 'Já possui uma conta?'} {' '}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', color: 'var(--primary)', fontWeight: '700' }}>
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
