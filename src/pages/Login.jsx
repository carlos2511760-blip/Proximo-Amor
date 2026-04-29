import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../supabase';
import Toast from '../components/Toast';
import Layout from '../components/layout/Layout';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error' });
  const [formData, setFormData] = useState({ email: '', password: '' });

  const showToast = (message, type = 'error') => setToast({ message, type });
  const closeToast = () => setToast({ message: '', type: 'error' });

  function traduzirErro(msg) {
    if (!msg) return 'Ocorreu um erro inesperado. Tente novamente.';
    const m = msg.toLowerCase();
    if (m.includes('invalid login credentials') || m.includes('invalid_grant'))
      return 'E-mail ou senha incorretos. Verifique seus dados.';
    if (m.includes('network') || m.includes('fetch'))
      return 'Problema de conexão. Verifique sua internet.';
    return 'Não foi possível entrar. Tente novamente em instantes.';
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    closeToast();
    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) throw error;
      const { data: profile } = await supabase
        .from('profiles').select('role').eq('id', authData.user.id).single();
      navigate(profile?.role === 'ong' ? '/ong/dashboard' : '/voluntario/dashboard');
    } catch (error) {
      showToast(traduzirErro(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <div className="auth-card">
        <div className="auth-logo">
          <img src="/favicon.svg" alt="Próximo Amor" className="auth-logo-img" />
        </div>
        <h2 className="auth-title">{t('auth.loginTitle')}</h2>
        <p className="auth-subtitle">{t('auth.loginSub')}</p>

        <form className="auth-form-inner" onSubmit={handleLogin}>
          <div className="auth-field">
            <label htmlFor="login-email" className="auth-label">
              <Mail size={16} className="auth-label-icon" /> {t('auth.email')}
            </label>
            <input
              id="login-email"
              type="email"
              placeholder="seu@email.com"
              className="auth-input"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password" className="auth-label">
              <Lock size={16} className="auth-label-icon" /> {t('auth.password')}
            </label>
            <div className="auth-input-wrap">
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className="auth-input"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button type="button" className="auth-eye" onClick={() => setShowPass(!showPass)} aria-label="Mostrar senha">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="auth-options">
            <label className="auth-remember">
              <input type="checkbox" className="auth-checkbox" /> {t('auth.remember')}
            </label>
            <a href="#" className="auth-forgot">{t('auth.forgot')}</a>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Entrando...' : t('auth.enter')}
          </button>
        </form>

        <div className="auth-footer-text">
          {t('auth.noAccount')}
          <Link to="/cadastro/voluntario" className="auth-link"> {t('auth.signup')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
