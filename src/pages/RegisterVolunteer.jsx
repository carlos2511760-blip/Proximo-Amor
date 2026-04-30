import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
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
    <div className="flex min-h-screen items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-[40px] border-2 border-black shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center text-white shadow-lg">
              <User size={36} fill="currentColor" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-navy tracking-tight mb-2">Seja um voluntário</h2>
          <p className="text-lg font-medium text-text-muted">Dados da Conta</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="vol-name" className="block text-lg font-bold text-navy mb-1">Nome Completo</label>
              <input id="vol-name" type="text" placeholder="Insira seu nome aqui" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="vol-email" className="block text-lg font-bold text-navy mb-1">E-mail</label>
              <input id="vol-email" type="email" placeholder="seu@email.com" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label htmlFor="vol-password" className="block text-lg font-bold text-navy mb-1">Senha</label>
              <input id="vol-password" type="password" placeholder="••••••••" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div>
              <label htmlFor="vol-confirm" className="block text-lg font-bold text-navy mb-1">Confirme sua senha</label>
              <input id="vol-confirm" type="password" placeholder="••••••••" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xl font-bold rounded-full text-white bg-[#40C1FD] hover:bg-[#35b0e8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40C1FD] transition-all shadow-lg" disabled={loading}>
              {loading ? t('auth.loading') : 'Avançar'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-text-muted">
            {t('auth.alreadyAccount')}
            <Link to="/login" className="font-bold text-primary hover:underline ml-1"> {t('auth.loginLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterVolunteer;
