import Layout from '../components/layout/Layout';

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error' });
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

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

      // Busca no banco se a pessoa é ONG ou Voluntário
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profile?.role === 'ong') {
        navigate('/ong/dashboard');
      } else {
        navigate('/voluntario/dashboard');
      }
    } catch (error) {
      showToast(traduzirErro(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <div className="min-h-[80vh] flex items-center justify-center py-20 bg-bg-main">
        <div className="bg-white p-12 rounded-[40px] shadow-2xl w-full max-w-lg border border-slate-100 animate-in">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-navy mb-3">{t('auth.loginTitle')}</h2>
            <p className="text-text-muted">{t('auth.loginSub')}</p>
          </div>
          
          <form className="flex flex-col gap-6" onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-navy ml-1">{t('auth.email')}</label>
              <input 
                type="email" 
                placeholder="seu@email.com" 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-primary transition-all text-navy"
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-navy ml-1">{t('auth.password')}</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-primary transition-all text-navy"
                required 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm px-1">
              <label className="flex items-center gap-2 cursor-pointer text-text-muted">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-primary" /> 
                {t('auth.remember')}
              </label>
              <a href="#" className="font-bold text-primary hover:underline">{t('auth.forgot')}</a>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-full py-4 text-lg mt-4" 
              disabled={loading}
            >
              {loading ? 'Entrando...' : t('auth.enter')}
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-slate-50 text-center">
            <p className="text-text-muted">
              {t('auth.noAccount')} <Link to="/register-options" className="font-bold text-primary hover:underline ml-1">{t('auth.signup')}</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
