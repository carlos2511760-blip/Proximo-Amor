import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../supabase';
import Toast from '../components/Toast';

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
    <div className="flex min-h-screen items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-[40px] border-2 border-black shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center text-white shadow-lg">
              <LogIn size={36} fill="currentColor" />
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-navy tracking-tight mb-2">{t('auth.loginTitle')}</h2>
          <p className="text-lg font-medium text-text-muted">{t('auth.loginSub')}</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-lg font-bold text-navy mb-1">
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="login-email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="login-password" className="block text-lg font-bold text-navy mb-1">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="login-password"
                  type={showPass ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button 
                  type="button" 
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-navy transition-colors" 
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-primary border-black rounded" />
              <label className="ml-2 block text-sm text-text-muted">{t('auth.remember')}</label>
            </div>
            <a href="#" className="text-sm font-bold text-primary hover:underline">{t('auth.forgot')}</a>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xl font-bold rounded-full text-white bg-[#40C1FD] hover:bg-[#35b0e8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40C1FD] transition-all shadow-lg" disabled={loading}>
              {loading ? 'Entrando...' : t('auth.enter')}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-text-muted">
            {t('auth.noAccount')}
            <Link to="/cadastro" className="font-bold text-primary hover:underline ml-1">{t('auth.signup')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
