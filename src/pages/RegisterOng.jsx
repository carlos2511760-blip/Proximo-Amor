import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import { Building2 } from 'lucide-react';
=======
import { Building } from 'lucide-react';
>>>>>>> Stashed changes
import { useLanguage } from '../contexts/LanguageContext';
import { supabase } from '../supabase';
import Toast from '../components/Toast';

const RegisterOng = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error' });
<<<<<<< Updated upstream
  const [formData, setFormData] = useState({ name: '', cnpj: '', email: '', cause: '', password: '' });
=======
  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    email: '',
    cause: '',
    password: ''
  });
>>>>>>> Stashed changes

  const showToast = (message, type = 'error') => setToast({ message, type });
  const closeToast = () => setToast({ message: '', type: 'error' });

  function traduzirErro(msg) {
    if (!msg) return 'Ocorreu um erro inesperado. Tente novamente.';
    const m = msg.toLowerCase();
<<<<<<< Updated upstream
    if (m.includes('already exists') || m.includes('unique constraint')) return 'Este e-mail ou CNPJ já está cadastrado.';
    if (m.includes('password') && m.includes('short')) return 'A senha deve ter pelo menos 6 caracteres.';
    if (m.includes('network') || m.includes('fetch')) return 'Erro de conexão. Verifique sua internet.';
=======
    if (m.includes('already exists') || m.includes('unique constraint'))
      return 'Este e-mail ou CNPJ já está cadastrado.';
    if (m.includes('password') && m.includes('short'))
      return 'A senha deve ter pelo menos 6 caracteres.';
    if (m.includes('network') || m.includes('fetch'))
      return 'Erro de conexão. Verifique sua internet.';
>>>>>>> Stashed changes
    return 'Não foi possível cadastrar a ONG. Verifique os dados.';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    closeToast();
    setLoading(true);
<<<<<<< Updated upstream
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
=======

    try {
      // 0. Verifica se o e-mail já existe
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingProfile) {
        throw new Error("Este e-mail já está em uso em nossa plataforma.");
      }

      const { data: { user }, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{
          id: user.id,
          full_name: formData.name,
          email: formData.email,
          role: 'ong',
          cnpj: formData.cnpj,
          cause: formData.cause
        }]);

      if (profileError) throw profileError;

      showToast("Cadastro de ONG realizado com sucesso!", "success");
>>>>>>> Stashed changes
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
              <Building2 size={36} fill="currentColor" />
            </div>
          </div>
<<<<<<< Updated upstream
          <h2 className="text-4xl font-extrabold text-navy tracking-tight mb-2">Seja um galho</h2>
=======
          <h2 className="text-4xl font-extrabold text-navy tracking-tight mb-2">Seja uma ONG</h2>
>>>>>>> Stashed changes
          <p className="text-lg font-medium text-text-muted">Dados da Organização</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
<<<<<<< Updated upstream
              <label htmlFor="ong-name" className="block text-lg font-bold text-navy mb-1">{t('auth.ongName')}</label>
              <input id="ong-name" type="text" placeholder="Ex: Instituto Acolher" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="cnpj" className="block text-lg font-bold text-navy mb-1">{t('auth.cnpj')}</label>
              <input id="cnpj" type="text" placeholder="00.000.000/0000-00" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.cnpj} onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} />
            </div>
            <div>
              <label htmlFor="ong-email" className="block text-lg font-bold text-navy mb-1">{t('auth.corpEmail')}</label>
              <input id="ong-email" type="email" placeholder="contato@ong.org.br" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label htmlFor="cause" className="block text-lg font-bold text-navy mb-1">{t('auth.mainCause')}</label>
              <select id="cause" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all bg-white" required
                value={formData.cause} onChange={(e) => setFormData({ ...formData, cause: e.target.value })}>
                <option value="">{t('auth.selectCause')}</option>
                <option value="Educação">{t('cause.edu')}</option>
                <option value="Meio Ambiente">{t('cause.env')}</option>
                <option value="Saúde">{t('cause.health')}</option>
                <option value="Assistência Social">{t('cause.social')}</option>
                <option value="Proteção Animal">{t('cause.animals')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="ong-password" className="block text-lg font-bold text-navy mb-1">{t('auth.password')}</label>
=======
              <label htmlFor="ong-name" className="block text-lg font-bold text-navy mb-1">Nome da ONG</label>
              <input id="ong-name" type="text" placeholder="Nome oficial da entidade" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div>
              <label htmlFor="ong-cnpj" className="block text-lg font-bold text-navy mb-1">CNPJ</label>
              <input id="ong-cnpj" type="text" placeholder="00.000.000/0000-00" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.cnpj} onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })} />
            </div>
            <div>
              <label htmlFor="ong-email" className="block text-lg font-bold text-navy mb-1">E-mail Corporativo</label>
              <input id="ong-email" type="email" placeholder="contato@ong.org" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div>
              <label htmlFor="ong-password" className="block text-lg font-bold text-navy mb-1">Senha</label>
>>>>>>> Stashed changes
              <input id="ong-password" type="password" placeholder="••••••••" className="w-full px-6 py-3 rounded-full border-2 border-black text-navy focus:ring-2 focus:ring-primary focus:outline-none transition-all" required
                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-xl font-bold rounded-full text-white bg-[#40C1FD] hover:bg-[#35b0e8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#40C1FD] transition-all shadow-lg" disabled={loading}>
<<<<<<< Updated upstream
              {loading ? t('auth.loading') : 'Iniciar'}
=======
              {loading ? t('auth.loading') : 'Avançar'}
>>>>>>> Stashed changes
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

export default RegisterOng;
