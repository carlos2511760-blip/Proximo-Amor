import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../supabase';
import Toast from '../components/Toast';

const RegisterOng = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error' });
  const [formData, setFormData] = useState({ name: '', cnpj: '', email: '', cause: '', password: '' });

  const showToast = (message, type = 'error') => setToast({ message, type });
  const closeToast = () => setToast({ message: '', type: 'error' });

  function traduzirErro(msg) {
    if (!msg) return 'Ocorreu um erro inesperado. Tente novamente.';
    const m = msg.toLowerCase();
    if (m.includes('already exists') || m.includes('unique constraint')) return 'Este e-mail ou CNPJ já está cadastrado.';
    if (m.includes('password') && m.includes('short')) return 'A senha deve ter pelo menos 6 caracteres.';
    if (m.includes('network') || m.includes('fetch')) return 'Erro de conexão. Verifique sua internet.';
    return 'Não foi possível cadastrar a ONG. Verifique os dados.';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeToast();
    setLoading(true);
    try {
      const { data: existing } = await supabase.from('profiles').select('email').eq('email', formData.email).maybeSingle();
      if (existing) throw new Error('Este e-mail já está em uso em nossa plataforma.');

      const { data: { user }, error: authError } = await supabase.auth.signUp({ email: formData.email, password: formData.password });
      if (authError) throw authError;

      const { error: profileError } = await supabase.from('profiles').insert([{
        id: user.id, full_name: formData.name, email: formData.email,
        role: 'ong', cnpj: formData.cnpj, cause: formData.cause
      }]);
      if (profileError) throw profileError;

      showToast('Cadastro de ONG realizado com sucesso!', 'success');
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
        <div className="auth-badge auth-badge-ong">ONG</div>
        <h2 className="auth-title">{t('auth.regOngTitle')}</h2>
        <p className="auth-subtitle">{t('auth.regOngSub')}</p>

        <form className="auth-form-inner" onSubmit={handleSubmit}>
          <div className="auth-row">
            <div className="auth-field">
              <label htmlFor="ong-name" className="auth-label">{t('auth.ongName')}</label>
              <input id="ong-name" type="text" placeholder="Ex: Instituto Acolher" className="auth-input" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="auth-field">
              <label htmlFor="cnpj" className="auth-label">{t('auth.cnpj')}</label>
              <input id="cnpj" type="text" placeholder="00.000.000/0000-00" className="auth-input" required
                value={formData.cnpj} onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} />
            </div>
          </div>
          <div className="auth-field">
            <label htmlFor="ong-email" className="auth-label">{t('auth.corpEmail')}</label>
            <input id="ong-email" type="email" placeholder="contato@ong.org.br" className="auth-input" required
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="auth-field">
            <label htmlFor="cause" className="auth-label">{t('auth.mainCause')}</label>
            <select id="cause" className="auth-input" required
              value={formData.cause} onChange={(e) => setFormData({ ...formData, cause: e.target.value })}>
              <option value="">{t('auth.selectCause')}</option>
              <option value="Educação">{t('cause.edu')}</option>
              <option value="Meio Ambiente">{t('cause.env')}</option>
              <option value="Saúde">{t('cause.health')}</option>
              <option value="Assistência Social">{t('cause.social')}</option>
              <option value="Proteção Animal">{t('cause.animals')}</option>
            </select>
          </div>
          <div className="auth-field">
            <label htmlFor="ong-password" className="auth-label">{t('auth.password')}</label>
            <input id="ong-password" type="password" placeholder="••••••••" className="auth-input" required
              value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
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

export default RegisterOng;
