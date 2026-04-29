import React, { useState, useEffect } from 'react';
import {
  Compass,
  Briefcase,
  User,
  Trophy,
  BookOpen,
  Settings,
  LogOut,
  Search,
  MapPin,
  Clock,
  Zap,
  Monitor,
  Heart,
  Bookmark,
  BookmarkCheck,
  Star,
  Award,
  MessageCircle,
  Play,
  ChevronRight,
  Flame,
  Shield,
  Sparkles,
  Users,
  Calendar,
  ExternalLink,
  X
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getMapsUrl, getCalendarUrl } from '../utils';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';
import ChatMessenger from '../components/ChatMessenger';
import Toast from '../components/Toast';
import Layout from '../components/layout/Layout';

const VolunteerDashboard = () => {
  const { profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('descobrir');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [savedVagas, setSavedVagas] = useState(() => {
    try { return JSON.parse(localStorage.getItem('savedVagas') || '[]'); } catch { return []; }
  });
  const [selectedVaga, setSelectedVaga] = useState(null);
  const [allVagas, setAllVagas] = useState([]); // Vagas do banco
  const [myParticipations, setMyParticipations] = useState([]);
  const [totalHours, setTotalHours] = useState(0); // Horas reais confirmadas
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark-theme'));
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [forumPosts, setForumPosts] = useState([]);
  const [forumInput, setForumInput] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => setToast({ message, type });
  const closeToast = () => setToast({ message: '', type: 'info' });

  const fetchStats = async () => {
    if (!profile) return;
    // Horas confirmadas
    const { data, error } = await supabase
      .from('participations')
      .select(`confirmed_by_ong, jobs (hours_each)`)
      .eq('volunteer_id', profile.id)
      .eq('confirmed_by_ong', true);
    if (!error && data) {
      const sum = data.reduce((acc, curr) => acc + (curr.jobs?.hours_each || 0), 0);
      setTotalHours(sum);
    }
    // Todas as participações (incluindo não confirmadas)
    const { data: parts, error: err2 } = await supabase
      .from('participations')
      .select('*, jobs(*,profiles(full_name))')
      .eq('volunteer_id', profile.id);
    if (!err2 && parts) setMyParticipations(parts);
  };

  // 1. Carregar Horas Confirmadas + Minhas Participações
  useEffect(() => {
    fetchStats();
  }, [profile]);

  // 3. Ouvir mudanças nas Participações em tempo real (Status e Horas)
  useEffect(() => {
    if (!profile) return;
    const channel = supabase
      .channel('my-participations-realtime')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'participations', filter: `volunteer_id=eq.${profile.id}` }, 
        () => {
          fetchStats(); // Atualiza na hora se a ONG confirmar ou se ele se inscrever
        }
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [profile]);

  // 2. Carregar Vagas Reais do Banco
  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*, profiles(full_name)')
        .eq('status', 'aberta');
      if (!error && data) {
        const mapped = data.map(job => {
          // Formatar data para exibição
          let fullDate = 'Data a confirmar';
          if (job.date) {
            try {
              const d = new Date(job.date + 'T00:00:00');
              fullDate = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
              if (job.time) fullDate += ` — ${job.time}`;
              if (job.time_end) fullDate += ` às ${job.time_end}`;
            } catch(e) { /* ignora erro de parsing */ }
          }
          return {
            ...job,
            org: job.profiles?.full_name || 'ONG',
            image: `https://picsum.photos/seed/${job.id}/400/200`,
            modality: job.location ? 'Presencial' : 'Remoto',
            fullDate,
            location: job.location || 'Remoto / Online',
          };
        });
        setAllVagas(mapped);
      }
    };
    fetchJobs();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  
  const { language, setLanguage, t } = useLanguage();

  // Carregar posts do fórum e ouvir em tempo real
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*, profiles(full_name)')
        .order('created_at', { ascending: false });
      if (!error) setForumPosts(data || []);
    };
    fetchPosts();

    // Realtime: novo post aparece para todos sem atualizar a página
    const channel = supabase
      .channel('forum-posts-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'forum_posts' }, async (payload) => {
        // Busca o nome do autor do novo post
        const { data: profileData } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', payload.new.user_id)
          .single();
        setForumPosts(prev => [{ ...payload.new, profiles: profileData }, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const handleForumPost = async () => {
    if (!forumInput.trim() || !profile) return;
    const { error } = await supabase
      .from('forum_posts')
      .insert([{ user_id: profile.id, content: forumInput.trim() }]);
    if (!error) setForumInput('');
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedVagas(prev => {
      const next = prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id];
      localStorage.setItem('savedVagas', JSON.stringify(next));
      return next;
    });
  };
    const filteredVagas = allVagas.filter(v => {
    if (activeFilter === 'remotas') return v.modality === 'Remoto';
    if (activeFilter === 'curtas') return v.duration === 'Curta';
    if (activeFilter === 'urgentes') return v.urgent;
    if (activeFilter === 'salvos') return savedVagas.includes(v.id);
    return true;
  });

  return (
    <Layout>
      <div className="vol-app-layout">
      {/* Top Navigation (Desktop) */}
      <nav className="vol-top-nav">
        <div className="vol-nav-brand">
          <Heart size={28} color="var(--azure-blue)" fill="var(--azure-blue)" />
          <span style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--navy-blue)' }}>Próximo Amor</span>
        </div>
        
        <div className="vol-nav-center">
          <button className={`vol-nav-item ${activeTab === 'descobrir' ? 'active' : ''}`} onClick={() => setActiveTab('descobrir')}>
            <Compass size={22} />
            <span>{t('nav.discover')}</span>
          </button>
          <button className={`vol-nav-item ${activeTab === 'conquistas' ? 'active' : ''}`} onClick={() => setActiveTab('conquistas')}>
            <Trophy size={22} />
            <span>{t('nav.achievements')}</span>
          </button>
          <button className={`vol-nav-item ${activeTab === 'minhasvagas' ? 'active' : ''}`} onClick={() => setActiveTab('minhasvagas')}>
            <Briefcase size={22} />
            <span>Minhas Vagas</span>
          </button>
          <button className={`vol-nav-item ${activeTab === 'comunidade' ? 'active' : ''}`} onClick={() => setActiveTab('comunidade')}>
            <BookOpen size={22} />
            <span>{t('nav.community')}</span>
          </button>
          <button className={`vol-nav-item ${activeTab === 'mensagens' ? 'active' : ''}`} onClick={() => setActiveTab('mensagens')}>
            <MessageCircle size={22} />
            <span>{t('nav.messages') || 'Mensagens'}</span>
          </button>
        </div>

        <div className="vol-nav-right">
          <button className={`vol-icon-btn ${activeTab === 'configuracoes' ? 'active' : ''}`} onClick={() => setActiveTab('configuracoes')} title="Configurações">
            <Settings size={20} />
          </button>
          <button onClick={handleLogout} className="vol-icon-btn" title="Sair"><LogOut size={20} /></button>
          <button className={`vol-profile-btn ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>
            <div className="vol-avatar-sm">{profile?.full_name?.substring(0, 2).toUpperCase() || 'V'}</div>
            <span className="vol-profile-name">{profile?.full_name?.split(' ')[0] || 'Voluntário'}</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="vol-main-content">
        <header className="vol-page-header">
          <h1>
            {activeTab === 'descobrir' && t('volApp.discoverTitle')}
            {activeTab === 'perfil' && t('nav.profile')}
            {activeTab === 'conquistas' && t('volApp.achievementsTitle')}
            {activeTab === 'minhasvagas' && 'Minhas Vagas'}
            {activeTab === 'comunidade' && t('volApp.communityTitle')}
            {activeTab === 'mensagens' && (t('nav.messages') || 'Mensagens')}
            {activeTab === 'configuracoes' && t('nav.settings')}
          </h1>
          {activeTab === 'descobrir' && (
            <div className="search-bar" style={{ background: 'white' }}>
              <Search size={18} />
              <input type="text" placeholder={t('volApp.searchPlaceholder')} />
            </div>
          )}
        </header>

        <div className="vol-content-container">

          {/* ===================== DESCOBRIR ===================== */}
          {activeTab === 'descobrir' && (
            <div className="fade-in">
              {/* Interests */}
              <div className="vol-interests">
                <h3>{t('volApp.causes')}</h3>
                <div className="interest-tags">
                  <span className="interest-tag active">🌱 Meio Ambiente</span>
                  <span className="interest-tag">📚 Educação</span>
                  <span className="interest-tag">🐾 Animais</span>
                  <span className="interest-tag">❤️ Saúde</span>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="vol-filters">
                <button className={`filter-chip ${activeFilter === 'todos' ? 'active' : ''}`} onClick={() => setActiveFilter('todos')}>{t('volApp.filters.all')}</button>
                <button className={`filter-chip ${activeFilter === 'remotas' ? 'active' : ''}`} onClick={() => setActiveFilter('remotas')}><Monitor size={14} /> {t('volApp.filters.remote')}</button>
                <button className={`filter-chip ${activeFilter === 'curtas' ? 'active' : ''}`} onClick={() => setActiveFilter('curtas')}><Clock size={14} /> {t('volApp.filters.short')}</button>
                <button className={`filter-chip ${activeFilter === 'urgentes' ? 'active' : ''}`} onClick={() => setActiveFilter('urgentes')}><Zap size={14} /> {t('volApp.filters.urgent')}</button>
                <button className={`filter-chip ${activeFilter === 'salvos' ? 'active' : ''}`} onClick={() => setActiveFilter('salvos')}><Bookmark size={14} /> {t('volApp.filters.saved')} ({savedVagas.length})</button>
              </div>

              {/* Cards Grid */}
              <div className="vol-vagas-grid">
                {filteredVagas.length === 0 && (
                  <div className="empty-state">
                    <Bookmark size={48} color="#cbd5e1" />
                    <p>Nenhuma vaga encontrada nesse filtro.</p>
                  </div>
                )}
                {filteredVagas.map(vaga => (
                  <div key={vaga.id} className="vol-vaga-card" onClick={() => setSelectedVaga(vaga)}>
                    <div className="vol-vaga-img">
                      <img src={vaga.image} alt={vaga.title} />
                      {vaga.urgent && <span className="urgent-badge"><Zap size={12} /> Urgente</span>}
                      <button className="save-btn" onClick={(e) => toggleSave(e, vaga.id)}>
                        {savedVagas.includes(vaga.id) ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                      </button>
                    </div>
                    <div className="vol-vaga-body">
                      <div className="vol-vaga-tags">
                        <span className="tag blue">{vaga.category}</span>
                        <span className="tag gray">{vaga.modality}</span>
                      </div>
                      <h3>{vaga.title}</h3>
                      <p className="vol-vaga-org">{vaga.org}</p>
                      <div className="vol-vaga-footer">
                        <span><MapPin size={14} /> {vaga.location.length > 25 ? vaga.location.substring(0, 25) + '...' : vaga.location}</span>
                        {myParticipations.some(p => p.job_id === vaga.id) ? (
                          <span style={{ color: '#10b981', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                             <BookmarkCheck size={16} /> Inscrito
                          </span>
                        ) : (
                          <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>{t('volApp.detailsBtn')}</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Map Placeholder */}
              <div className="vol-map-section">
                <div className="vol-map-header">
                  <h3><MapPin size={20} /> Oportunidades Perto de Você</h3>
                </div>
                <div className="vol-map-placeholder">
                  <MapPin size={48} color="var(--azure-blue)" />
                  <p>Mapa interativo com vagas próximas à sua localização</p>
                  <button className="btn-primary" style={{ padding: '0.5rem 1.5rem' }}>Ativar Localização</button>
                </div>
              </div>
            </div>
          )}

          {/* ===================== MINHAS VAGAS ===================== */}
          {activeTab === 'minhasvagas' && (
            <div className="fade-in">
              {myParticipations.length === 0 ? (
                <div className="empty-state" style={{ padding: '3rem' }}>
                  <Briefcase size={48} color="#cbd5e1" />
                  <h3 style={{ marginTop: '1rem', color: 'var(--text-dark)' }}>Nenhuma inscrição ainda</h3>
                  <p>Explore vagas na aba Descobrir e candidate-se!</p>
                  <button className="btn-primary" style={{ marginTop: '1rem' }} onClick={() => setActiveTab('descobrir')}>Ir para Descobrir</button>
                </div>
              ) : (
                <div className="vol-vagas-grid">
                  {myParticipations.map(p => {
                    const job = p.jobs;
                    if (!job) return null;
                    let fullDate = 'Data a confirmar';
                    if (job.date) {
                      try {
                        const d = new Date(job.date + 'T00:00:00');
                        fullDate = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
                        if (job.time) fullDate += ` — ${job.time}`;
                      } catch(e) {}
                    }
                    return (
                      <div key={p.id} className="vol-vaga-card" style={{ cursor: 'default' }}>
                        <div className="vol-vaga-img">
                          <img src={`https://picsum.photos/seed/${job.id}/400/200`} alt={job.title} />
                          <span className={`urgent-badge`} style={{ background: p.confirmed_by_ong ? '#10b981' : '#f59e0b' }}>
                            {p.confirmed_by_ong ? '✅ Confirmado' : '⏳ Pendente'}
                          </span>
                        </div>
                        <div className="vol-vaga-body">
                          <div className="vol-vaga-tags">
                            <span className="tag blue">{job.category}</span>
                            <span className="tag gray">{job.hours_each}h</span>
                          </div>
                          <h3>{job.title}</h3>
                          <p className="vol-vaga-org">{job.profiles?.full_name || 'ONG'}</p>
                          <div className="vol-vaga-footer">
                            <span><Calendar size={14} /> {fullDate}</span>
                            <span><MapPin size={14} /> {job.location || 'Remoto'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ===================== PERFIL ===================== */}
          {activeTab === 'perfil' && (
            <div className="fade-in">
              {/* Profile Header */}
              <div className="vol-profile-header">
                <div className="vol-avatar-big">{profile?.full_name?.substring(0, 2).toUpperCase() || 'V'}</div>
                <div className="vol-profile-info">
                  <h2>{profile?.full_name || 'Voluntário'}</h2>
                  <p>{profile?.skills || 'Adicione suas habilidades nas configurações'}</p>
                </div>
                <div className="vol-hours-counter">
                  <span className="hours-number">{totalHours}</span>
                  <span className="hours-label">{t('volProf.donatedHours')}</span>
                </div>
              </div>

              {/* History Timeline */}
              <div className="dash-panel" style={{ marginBottom: '1.5rem' }}>
                <h3 className="panel-title">{t('volProf.history')}</h3>
                <div className="empty-state" style={{ padding: '2rem' }}>
                  <Clock size={36} color="#cbd5e1" />
                  <p>Você ainda não participou de nenhuma ação voluntária. Explore as oportunidades na aba Descobrir!</p>
                </div>
              </div>

              {/* Testimonials */}
              <div className="dash-panel">
                <h3 className="panel-title">{t('volProf.testimonials')}</h3>
                <div className="empty-state" style={{ padding: '2rem' }}>
                  <Star size={36} color="#cbd5e1" />
                  <p>Nenhuma avaliação recebida ainda. As ONGs poderão te avaliar após suas participações.</p>
                </div>
              </div>
            </div>
          )}

          {/* ===================== CONQUISTAS ===================== */}
          {activeTab === 'conquistas' && (
            <div className="fade-in">
              {/* Impact Banner */}
              <div className="impact-banner">
                <div className="impact-text">
                  <Flame size={28} />
                  <div>
                    <h3>{t('volAchieve.congrats')}</h3>
                    <p>{t('volAchieve.impactBanner')}</p>
                  </div>
                </div>
              </div>

              {/* Badges - Desbloqueio Automático */}
              <div className="dash-panel" style={{ marginBottom: '1.5rem' }}>
                <h3 className="panel-title">{t('volAchieve.badges')}</h3>
                <div className="badges-grid">
                  <div className={`badge-card ${totalHours >= 50 ? 'earned' : 'locked'}`}>
                    <Award size={36} color={totalHours >= 50 ? '#f59e0b' : 'currentColor'} />
                    <h4>Super Voluntário</h4>
                    <p>+50 horas no ano</p>
                    <div className="badge-progress">
                      <div className="badge-bar" style={{ width: `${Math.min((totalHours / 50) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                  
                  <div className={`badge-card ${totalHours >= 200 ? 'earned' : 'locked'}`}>
                    <Shield size={36} color={totalHours >= 200 ? '#3b82f6' : 'currentColor'} />
                    <h4>Veterano</h4>
                    <p>200 horas voluntariadas</p>
                    <div className="badge-progress">
                      <div className="badge-bar" style={{ width: `${Math.min((totalHours / 200) * 100, 100)}%` }}></div>
                    </div>
                  </div>

                  <div className="badge-card locked">
                    <Flame size={36} />
                    <h4>Maratonista</h4>
                    <p>3 projetos seguidos</p>
                    <div className="badge-progress">
                      <div className="badge-bar" style={{ width: '0%' }}></div>
                    </div>
                  </div>

                  <div className="badge-card locked">
                    <Heart size={36} />
                    <h4>Coração de Ouro</h4>
                    <p>5 avaliações 5 estrelas</p>
                    <div className="badge-progress">
                      <div className="badge-bar" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Saved Vagas / Wishlist */}
              <div className="dash-panel">
                <h3 className="panel-title">{t('volAchieve.wishlist')}</h3>
                <div className="empty-state" style={{ padding: '2rem' }}>
                  <Bookmark size={36} color="#cbd5e1" />
                  <p>{t('volAchieve.emptyWishlist')}</p>
                </div>
              </div>
            </div>
          )}

          {/* ===================== COMUNIDADE ===================== */}
          {activeTab === 'comunidade' && (
            <div className="fade-in">
              {/* Forum */}
              <div className="dash-panel" style={{ marginBottom: '1.5rem' }}>
                <h3 className="panel-title">{t('volComm.forum')}</h3>
                {/* Input de nova postagem */}
                <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
                  <input
                    type="text"
                    placeholder="Compartilhe algo com os outros voluntários..."
                    value={forumInput}
                    onChange={(e) => setForumInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleForumPost()}
                    style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--card-bg)', color: 'var(--text-dark)' }}
                  />
                  <button className="btn-primary" onClick={handleForumPost} style={{ padding: '0 1.5rem', flexShrink: 0, borderRadius: '8px' }}>Publicar</button>
                </div>
                {/* Lista de posts reais do banco */}
                {forumPosts.length === 0 ? (
                  <div className="empty-state" style={{ padding: '2rem' }}>
                    <MessageCircle size={36} color="#cbd5e1" />
                    <p>{t('volComm.emptyForum')}</p>
                  </div>
                ) : (
                  <div className="forum-list">
                    {forumPosts.map(post => (
                      <div key={post.id} className="forum-post">
                        <div className="forum-avatar">{post.profiles?.full_name?.substring(0, 2).toUpperCase() || 'V'}</div>
                        <div className="forum-body">
                          <p style={{ marginBottom: '0.4rem' }}>{post.content}</p>
                          <div className="forum-meta">
                            <span>{post.profiles?.full_name || 'Voluntário'}</span>
                            <span>• {new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Learning */}
              <div className="dash-panel">
                <h3 className="panel-title">🎓 Materiais de Apoio</h3>
                <div className="learning-grid">
                  <div className="learning-card">
                    <div className="learning-icon"><Play size={24} color="white" /></div>
                    <div>
                      <h4>Como ser um voluntário melhor</h4>
                      <p>Vídeo — 8 min</p>
                    </div>
                    <ChevronRight size={20} color="var(--text-gray)" />
                  </div>
                  <div className="learning-card">
                    <div className="learning-icon" style={{ background: '#8b5cf6' }}><BookOpen size={24} color="white" /></div>
                    <div>
                      <h4>Boas práticas de trabalho remoto</h4>
                      <p>Artigo — 5 min de leitura</p>
                    </div>
                    <ChevronRight size={20} color="var(--text-gray)" />
                  </div>
                  <div className="learning-card">
                    <div className="learning-icon" style={{ background: '#10b981' }}><MessageCircle size={24} color="white" /></div>
                    <div>
                      <h4>Comunicação eficaz com ONGs</h4>
                      <p>Guia — 3 min de leitura</p>
                    </div>
                    <ChevronRight size={20} color="var(--text-gray)" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== CONFIGURAÇÕES ===================== */}
          {activeTab === 'mensagens' && (
            <ChatMessenger userType="volunteer" />
          )}

          {activeTab === 'configuracoes' && (
            <div className="fade-in">
              <div className="dash-panel" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h3 className="panel-title" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>{t('settings.titleVol')}</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>{t('settings.darkMode')}</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('settings.darkModeDesc')}</p>
                  </div>
                  <button 
                    onClick={() => setIsDarkMode(!isDarkMode)} 
                    style={{
                      background: isDarkMode ? 'var(--azure-blue)' : '#e2e8f0',
                      border: 'none',
                      borderRadius: '999px',
                      width: '50px',
                      height: '26px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                  >
                    <div style={{
                      background: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '3px',
                      left: isDarkMode ? '27px' : '3px',
                      transition: 'left 0.3s ease'
                    }}></div>
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>{t('settings.language')}</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('settings.languageDesc')}</p>
                  </div>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--card-bg)', color: 'var(--text-dark)' }}>
                    <option value="pt-br">Português (Brasil)</option>
                    <option value="en">English (US)</option>
                    <option value="es">Español</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>{t('settings.dataSaver')}</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('settings.dataSaverDesc')}</p>
                  </div>
                  <button 
                    onClick={() => {}} 
                    style={{
                      background: '#e2e8f0',
                      border: 'none',
                      borderRadius: '999px',
                      width: '50px',
                      height: '26px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                  >
                    <div style={{
                      background: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '3px',
                      left: '3px',
                      transition: 'left 0.3s ease'
                    }}></div>
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h4 style={{ fontWeight: 600 }}>{t('settings.notifications')}</h4>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem' }}>{t('settings.notificationsDesc')}</p>
                  </div>
                  <button 
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)} 
                    style={{
                      background: notificationsEnabled ? 'var(--azure-blue)' : '#e2e8f0',
                      border: 'none',
                      borderRadius: '999px',
                      width: '50px',
                      height: '26px',
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                  >
                    <div style={{
                      background: 'white',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '3px',
                      left: notificationsEnabled ? '27px' : '3px',
                      transition: 'left 0.3s ease'
                    }}></div>
                  </button>
                </div>

                <div style={{ borderBottom: '1px solid var(--border-color)', margin: '2rem 0' }}></div>

                <h3 className="panel-title" style={{ marginBottom: '1.5rem' }}>{t('settings.security')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <button className="btn-outline" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '1rem' }}>{t('settings.changePassword')}</button>
                  <button className="btn-outline" style={{ display: 'block', width: '100%', textAlign: 'left', padding: '1rem', color: '#ef4444', borderColor: '#fee2e2' }}>{t('settings.deactivateAccount')}</button>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="vol-bottom-nav">
        <button className={`vol-bottom-nav-item ${activeTab === 'descobrir' ? 'active' : ''}`} onClick={() => setActiveTab('descobrir')}>
          <Compass size={24} />
          <span>Feed</span>
        </button>
        <button className={`vol-bottom-nav-item ${activeTab === 'conquistas' ? 'active' : ''}`} onClick={() => setActiveTab('conquistas')}>
          <Trophy size={24} />
          <span>Metas</span>
        </button>
        <button className={`vol-bottom-nav-item ${activeTab === 'minhasvagas' ? 'active' : ''}`} onClick={() => setActiveTab('minhasvagas')}>
          <Briefcase size={24} />
          <span>Vagas</span>
        </button>
        <button className={`vol-bottom-nav-item ${activeTab === 'comunidade' ? 'active' : ''}`} onClick={() => setActiveTab('comunidade')}>
          <BookOpen size={24} />
          <span>Apoio</span>
        </button>
        <button className={`vol-bottom-nav-item ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}>
          <User size={24} />
          <span>Perfil</span>
        </button>
      </nav>

      {/* ===================== MODAL DE DETALHES ===================== */}
      {selectedVaga && (
        <div className="modal-overlay" onClick={() => setSelectedVaga(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedVaga(null)}><X size={24} /></button>
            <div className="modal-header">
              <img src={selectedVaga.image} alt={selectedVaga.title} className="modal-hero-img" />
              <div className="modal-title-area">
                <span className="tag blue">{selectedVaga.category}</span>
                <h2>{selectedVaga.title}</h2>
                <p className="modal-org-name">{selectedVaga.org}</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-desc">
                <h3>Sobre a vaga</h3>
                <p>{selectedVaga.description}</p>
              </div>
              
              <div className="modal-details-grid">
                <div className="modal-detail-item">
                  <div className="detail-icon"><Calendar size={20} /></div>
                  <div>
                    <h4>Quando</h4>
                    <p>{selectedVaga.fullDate}</p>
                    {selectedVaga.date && (
                      <a 
                        href={getCalendarUrl({
                          title: selectedVaga.title,
                          description: selectedVaga.description,
                          location: selectedVaga.location,
                          startDate: selectedVaga.date,
                          endDate: selectedVaga.endDate || selectedVaga.date
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-link"
                      >
                        <ExternalLink size={14} /> Salvar na Agenda
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="modal-detail-item">
                  <div className="detail-icon"><MapPin size={20} /></div>
                  <div>
                    <h4>Onde</h4>
                    <p>{selectedVaga.location}</p>
                    {selectedVaga.modality !== 'Remoto' && (
                      <a 
                        href={getMapsUrl(selectedVaga.location)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="detail-link"
                      >
                        <ExternalLink size={14} /> Abrir no GPS
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => setSelectedVaga(null)}>Voltar</button>
              {myParticipations.some(p => p.job_id === selectedVaga.id) ? (
                <button className="btn-primary" style={{ flex: 2, background: '#10b981', cursor: 'default' }} disabled>
                  Já Inscrito
                </button>
              ) : (
                <button 
                  className="btn-primary" 
                  style={{ flex: 2 }}
                  onClick={async () => {
                    if (!profile) return;
                    const { error } = await supabase
                      .from('participations')
                      .insert([{
                        volunteer_id: profile.id,
                        job_id: selectedVaga.id
                      }]);
                    if (!error) {
                      showToast('Inscrição confirmada com sucesso! A ONG foi notificada.', 'success');
                      setSelectedVaga(null);
                      fetchStats(); // Força atualização local imediata
                    } else if (error.code === '23505') {
                      showToast('Você já está inscrito nesta vaga!', 'warning');
                    } else {
                      showToast('Erro ao se inscrever. Tente novamente.', 'error');
                    }
                  }}
                >
                  Quero me candidatar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
};

export default VolunteerDashboard;
