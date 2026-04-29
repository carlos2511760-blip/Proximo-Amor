import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../supabase';
import Toast from '../components/Toast';

const RegisterVolunteer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error' });
  const [formData, setFormData] = useState({ name: '', email: '', skills: '', password: '', confirmPassword: '' });

  const showToast = (message, type = 'error') => setToast({ message, type });
  const closeToast = () => setToast({ message: '', type: 'error' });

  function traduzirErro(msg) {
    if (!msg) return 'Ocorreu um erro inesperado. Tente novamente.';
    const m = msg.toLowerCase();
    if (m.includes('already exists') || m.includes('unique constraint') || m.includes('already registered'))
      return 'Este e-mail já está em uso. Tente outro.';
    if (m.includes('password') && m.includes('short')) return 'A senha deve ter pelo menos 6 caracteres.';
    if (m.includes('network') || m.includes('fetch')) return 'Erro de conexão. Verifique sua internet.';
    return 'Não foi possível realizar o cadastro. Tente novamente.';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeToast();
    if (formData.password !== formData.confirmPassword) {
      showToast('As senhas não coincidem!', 'warning');
      return;
    }
    setLoading(true);
    try {
      const { data: existing } = await supabase.from('profiles').select('email').eq('email', formData.email).maybeSingle();
      if (existing) throw new Error('Este e-mail já está cadastrado em nossa plataforma.');

      const { data: { user }, error: authError } = await supabase.auth.signUp({ email: formData.email, password: formData.password });
      if (authError) throw authError;

      const { error: profileError } = await supabase.from('profiles').insert([{
        id: user.id, full_name: formData.name, email: formData.email,
        role: 'voluntario', skills: formData.skills
      }]);
      if (profileError) throw profileError;

      showToast('Cadastro realizado com sucesso!', 'success');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      showToast(traduzirErro(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <div className="auth-card auth-card-wide">
        <div className="auth-badge auth-badge-vol">Voluntário</div>
        <h2 className="auth-title">{t('auth.regVolTitle')}</h2>
        <p className="auth-subtitle">{t('auth.regVolSub')}</p>

        <form className="auth-form-inner" onSubmit={handleSubmit}>
          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="vol-name" className="auth-label">{t('auth.fullName')}</label>
              <input id="vol-name" type="text" placeholder="Seu nome completo" className="auth-input" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="auth-field">
              <label htmlFor="vol-email" className="auth-label">{t('auth.email')}</label>
              <input id="vol-email" type="email" placeholder="seu@email.com" className="auth-input" required
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
          </div>
          <div className="auth-field">
            <label htmlFor="skills" className="auth-label">{t('auth.skills')}</label>
            <input id="skills" type="text" placeholder={t('auth.skillsPlaceholder')} className="auth-input"
              value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
          </div>
          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="vol-password" className="auth-label">{t('auth.password')}</label>
              <input id="vol-password" type="password" placeholder="••••••••" className="auth-input" required
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div className="auth-field">
              <label htmlFor="vol-confirm" className="auth-label">{t('auth.confirmPass')}</label>
              <input id="vol-confirm" type="password" placeholder="••••••••" className="auth-input" required
                value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? t('auth.loading') : t('auth.finishReg')}
          </button>
        </form>

        <div className="auth-footer-text">
          {t('auth.alreadyAccount')}
          <Link to="/login" className="auth-link"> {t('auth.loginLink')}</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterVolunteer;
