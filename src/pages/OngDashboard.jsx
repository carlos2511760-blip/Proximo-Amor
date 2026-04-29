import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  MessageSquare, 
  FileText, 
  Settings, 
  LogOut,
  TrendingUp,
  AlertCircle,
  Calendar,
  PlusCircle,
  Search,
  MapPin,
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

const OngDashboard = () => {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('geral');
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark-theme'));
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => setToast({ message, type });
  const closeToast = () => setToast({ message: '', type: 'info' });

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Estados para Criação de Vagas
  const [isCreatingJob, setIsCreatingJob] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState('');
  const [newJobCategory, setNewJobCategory] = useState('Educação');
  const [newJobDate, setNewJobDate] = useState('');
  const [newJobTime, setNewJobTime] = useState('');
  const [newJobTimeEnd, setNewJobTimeEnd] = useState('');
  const [newJobLocation, setNewJobLocation] = useState('');
  const [newJobDesc, setNewJobDesc] = useState('');
  const [newJobHours, setNewJobHours] = useState('4');

  const [myRoles, setMyRoles] = useState([]);
  const [volunteersList, setVolunteersList] = useState([]);

  const fetchMyJobs = async () => {
    if (!profile) return;
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('ong_id', profile.id)
      .order('created_at', { ascending: false });
    if (!error) setMyRoles(data || []);
    // Carregar voluntários inscritos nas vagas dessa ONG
    const { data: partsData } = await supabase
      .from('participations')
      .select('*, jobs!inner(*), profiles:volunteer_id(full_name, id)')
      .eq('jobs.ong_id', profile.id);
    
    if (partsData) setVolunteersList(partsData);
  };

  // Carregar vagas reais da ONG logada
  useEffect(() => {
    fetchMyJobs();
  }, [profile]);

  // Realtime para a ONG: ouvir novos inscritos e novas vagas
  useEffect(() => {
    if (!profile) return;
    const channel = supabase
      .channel('ong-dashboard-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'participations' }, () => {
        fetchMyJobs(); // Atualiza se alguém se inscrever ou desinscrever
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs', filter: `ong_id=eq.${profile.id}` }, () => {
        fetchMyJobs(); // Atualiza se uma vaga for criada ou editada
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [profile]);

  const confirmPresence = async (participationId) => {
    const { error } = await supabase
      .from('participations')
      .update({ confirmed_by_ong: true })
      .eq('id', participationId);
    
    if (!error) {
      setVolunteersList(prev => prev.map(p => 
        p.id === participationId ? { ...p, confirmed_by_ong: true } : p
      ));
      alert("Presença confirmada! As horas foram creditadas ao voluntário.");
    } else {
      alert("Erro ao confirmar presença.");
    }
  };

  const isActionConcluded = (jobDate, jobTimeEnd) => {
    if (!jobDate) return true; // Se não tem data, permite (vagas antigas)
    const now = new Date();
    const actionDate = new Date(jobDate + 'T' + (jobTimeEnd || '23:59') + ':00');
    return now > actionDate;
  };

  const handleLocationBlur = async (e) => {
    const cepOnlyNumbers = e.target.value.replace(/\D/g, '');
    if (cepOnlyNumbers.length === 8) {
      const textoOriginal = e.target.value;
      setNewJobLocation("Buscando endereço...");
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepOnlyNumbers}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setNewJobLocation(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
        } else {
          setNewJobLocation(textoOriginal);
          alert("CEP não encontrado.");
        }
      } catch (error) {
        setNewJobLocation(textoOriginal);
      }
    }
  };

  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const projects = [];

  return (
    <Layout>
      <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>{profile?.full_name || 'Minha ONG'}</h2>
          <p>Painel da ONG</p>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-btn ${activeTab === 'geral' ? 'active' : ''}`} onClick={() => setActiveTab('geral')}>
            <LayoutDashboard size={20} /> {t('ongApp.overview')}
          </button>
          <button className={`nav-btn ${activeTab === 'vagas' ? 'active' : ''}`} onClick={() => setActiveTab('vagas')}>
            <Briefcase size={20} /> {t('ongApp.jobs')}
          </button>
          <button className={`nav-btn ${activeTab === 'voluntarios' ? 'active' : ''}`} onClick={() => setActiveTab('voluntarios')}>
            <Users size={20} /> {t('ongApp.volunteers')}
          </button>
          <button className={`nav-btn ${activeTab === 'comunicacao' ? 'active' : ''}`} onClick={() => setActiveTab('comunicacao')}>
            <MessageSquare size={20} /> {t('ongApp.comms')}
          </button>
          <button className={`nav-btn ${activeTab === 'relatorios' ? 'active' : ''}`} onClick={() => setActiveTab('relatorios')}>
            <FileText size={20} /> {t('ongApp.reports')}
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className={`nav-btn ${activeTab === 'configuracoes' ? 'active' : ''}`} onClick={() => setActiveTab('configuracoes')}>
            <Settings size={20} /> {t('nav.settings')}
          </button>
          <button onClick={handleLogout} className="nav-btn text-danger" style={{ background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left' }}>
            <LogOut size={20} /> Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <h1>
            {activeTab === 'geral' && t('ongApp.overview')}
            {activeTab === 'vagas' && t('ongApp.jobs')}
            {activeTab === 'voluntarios' && t('ongApp.volunteers')}
            {activeTab === 'comunicacao' && t('ongApp.comms')}
            {activeTab === 'relatorios' && t('ongApp.reports')}
            {activeTab === 'configuracoes' && t('ongApp.settingsTitle')}
          </h1>
          <div className="topbar-actions">
            <div className="search-bar">
              <Search size={18} />
              <input type="text" placeholder="Buscar no painel..." />
            </div>
            <div className="user-avatar">{profile?.full_name?.substring(0, 2).toUpperCase() || 'IA'}</div>
          </div>
        </header>

        <div className="dashboard-content">
          {activeTab === 'geral' && (
            <div className="fade-in">
              {/* Top Metrics */}
              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-header">
                    <h3>{t('ongContent.hours')}</h3>
                    <TrendingUp color="var(--azure-blue)" />
                  </div>
                  <p className="metric-value">0h</p>
                  <span className="metric-trend">Nenhuma hora registrada ainda</span>
                </div>
                <div className="metric-card">
                  <div className="metric-header">
                    <h3>{t('ongContent.totalVols')}</h3>
                    <Users color="var(--azure-blue)" />
                  </div>
                  <p className="metric-value">0</p>
                  <span className="metric-trend">Publique vagas para atrair voluntários</span>
                </div>
                <div className="metric-card">
                  <div className="metric-header">
                    <h3>{t('ongContent.activeJobs')}</h3>
                    <Briefcase color="var(--navy-blue)" />
                  </div>
                  <p className="metric-value">{myRoles.length}</p>
                  <span className="metric-trend">{myRoles.length === 0 ? 'Crie sua primeira vaga' : 'Ativas'}</span>
                </div>
              </div>

              {/* Alerts and Calendar */}
              <div className="dashboard-grid-2">
                <div className="dash-panel">
                  <div className="panel-header">
                    <h3><AlertCircle size={20} color="#eab308" /> Alertas</h3>
                  </div>
                  <div className="empty-state" style={{ padding: '2rem' }}>
                    <AlertCircle size={36} color="#cbd5e1" />
                    <p>Nenhum alerta no momento. Tudo tranquilo!</p>
                  </div>
                </div>
                
                <div className="dash-panel">
                  <div className="panel-header">
                    <h3><Calendar size={20} color="var(--navy-blue)" /> Próximos Eventos</h3>
                  </div>
                  <div className="empty-state" style={{ padding: '2rem' }}>
                    <Calendar size={36} color="#cbd5e1" />
                    <p>Crie vagas para ver seus eventos aqui.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vagas' && (
            <div className="fade-in">
              <div className="panel-header" style={{ borderBottom: 'none' }}>
                <h2>{t('ongContent.manageRoles')}</h2>
                <button className="btn-primary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }} onClick={() => setIsCreatingJob(true)}>
                  <PlusCircle size={20} /> {t('ongContent.addRole')}
                </button>
              </div>
              <div className="vagas-list">
                {myRoles.length === 0 ? (
                  <div className="empty-state" style={{ padding: '2rem' }}>
                    <Briefcase size={36} color="#cbd5e1" />
                    <p>Você ainda não criou nenhuma vaga. Clique em "Criar Nova Vaga" acima!</p>
                  </div>
                ) : (
                  myRoles.map(role => (
                    <div key={role.id} className="vaga-card-admin fade-in">
                      <div className="vaga-info">
                        <h3>{role.title}</h3>
                        <div className="vaga-tags">
                          <span className={`tag ${role.category === 'Educação' ? 'blue' : role.category === 'Saúde' ? 'green' : 'gray'}`}>{role.category}</span>
                          <span className="tag gray">{role.location || 'Sem local'}</span>
                        </div>
                      </div>
                      <div className="vaga-stats">
                        <p>Status: <strong>{role.status}</strong></p>
                        <p>{role.hours_each}h por participação</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'voluntarios' && (
            <div className="fade-in">
              <div className="panel-header" style={{ marginBottom: '2rem', borderBottom: 'none' }}>
                <h2 style={{ color: 'var(--navy-blue)' }}>{t('ongContent.manageVols')}</h2>
                <div className="search-bar" style={{ width: '300px', background: 'white' }}>
                  <Search size={18} />
                  <input type="text" placeholder={t('ongContent.searchVol')} />
                </div>
              </div>

              <div className="project-cards-list">
                {volunteersList.length === 0 ? (
                  <div className="empty-state" style={{ padding: '2rem' }}>
                    <Users size={36} color="#cbd5e1" />
                    <p>Nenhum voluntário inscrito ainda. Crie vagas para começar a receber candidaturas.</p>
                  </div>
                ) : (
                  <table className="volunteers-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem', background: 'white', borderRadius: '12px', overflow: 'hidden' }}>
                    <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <tr>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#64748b' }}>Vaga</th>
                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#64748b' }}>Voluntário</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#64748b' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '600', color: '#64748b' }}>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {volunteersList.map((vol) => (
                        <tr key={vol.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '1rem', fontWeight: '500' }}>{vol.jobs?.title}</td>
                          <td style={{ padding: '1rem', color: '#475569' }}>{vol.profiles?.full_name}</td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <span className={`status-badge`} style={{ background: vol.confirmed_by_ong ? '#d1fae5' : '#fef3c7', color: vol.confirmed_by_ong ? '#065f46' : '#92400e', padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem' }}>
                              {vol.confirmed_by_ong ? 'Confirmado' : 'Pendente'}
                            </span>
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            {!vol.confirmed_by_ong ? (
                              isActionConcluded(vol.jobs?.date, vol.jobs?.time_end) ? (
                                <button 
                                  className="btn-primary" 
                                  style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }} 
                                  onClick={() => confirmPresence(vol.id)}
                                >
                                  Confirmar Presença
                                </button>
                              ) : (
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
                                  <AlertCircle size={14} /> Aguarde a conclusão
                                </span>
                              )
                            ) : (
                              <span style={{ color: '#10b981', fontWeight: '500' }}>Horas creditadas</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

        {activeTab === 'comunicacao' && (
            <ChatMessenger userType="ong" />
          )}

          {activeTab === 'relatorios' && (
            <div className="fade-in dash-panel">
              <h3>{t('ongContent.reportsAndCerts')}</h3>
              <p style={{ color: 'var(--text-gray)', marginBottom: '2rem' }}>Gere valor para seus voluntários e parceiros.</p>
              
              <div className="comms-grid">
                <button className="comm-card">
                  <FileText size={32} color="#f59e0b" />
                  <h4>Gerar Certificado</h4>
                  <p>Emita um certificado de horas automático para um voluntário.</p>
                </button>
                <button className="comm-card">
                  <TrendingUp size={32} color="var(--azure-blue)" />
                  <h4>Exportar Relatório</h4>
                  <p>Baixe dados de impacto em PDF ou Excel.</p>
                </button>
              </div>
            </div>
          )}

          {/* ===================== CONFIGURAÇÕES ===================== */}
          {activeTab === 'configuracoes' && (
            <div className="fade-in">
              <div className="dash-panel" style={{ maxWidth: '600px' }}>
                <h3 className="panel-title" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>{t('settings.titleOng')}</h3>
                
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

      {/* JOB CREATION MODAL */}
      {isCreatingJob && (
        <div className="modal-backdrop" onClick={() => setIsCreatingJob(false)}>
          <div className="modal-content fade-in" style={{ maxWidth: '450px', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Criar Nova Vaga</h2>
              <button className="btn-close" onClick={() => setIsCreatingJob(false)}><X size={24} /></button>
            </div>
            <div style={{ padding: '1.5rem 2rem' }}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Título da Vaga</label>
                <input 
                  type="text" 
                  value={newJobTitle}
                  onChange={(e) => setNewJobTitle(e.target.value)}
                  placeholder="Ex: Reforço de Matemática"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Data</label>
                  <input 
                    type="date" 
                    value={newJobDate}
                    onChange={(e) => setNewJobDate(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Início</label>
                  <input 
                    type="time" 
                    value={newJobTime}
                    onChange={(e) => setNewJobTime(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Término</label>
                  <input 
                    type="time" 
                    value={newJobTimeEnd}
                    onChange={(e) => setNewJobTimeEnd(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Localização (Digite o CEP ou endereço)</label>
                <input 
                  type="text" 
                  value={newJobLocation}
                  onChange={(e) => setNewJobLocation(e.target.value)}
                  onBlur={handleLocationBlur}
                  placeholder="Digite o CEP com formato 00000000"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Causa</label>
                <select 
                  value={newJobCategory}
                  onChange={(e) => setNewJobCategory(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
                >
                  <option value="Educação">Educação</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Meio Ambiente">Meio Ambiente</option>
                  <option value="Animais">Animais</option>
                  <option value="Tecnologia">Tecnologia</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Descrição</label>
                <textarea 
                  value={newJobDesc}
                  onChange={(e) => setNewJobDesc(e.target.value)}
                  rows="4"
                  placeholder="Escreva os detalhes sobre o que o voluntário fará, os requisitos, etc..."
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '1rem' }}
                onClick={async () => {
                  if(!newJobTitle.trim()) {
                    alert("Preencha o título da vaga.");
                    return;
                  }
                  if(!profile) {
                    alert("Erro: perfil não carregado.");
                    return;
                  }
                  
                  // Calcular horas entre início e fim
                  let hours = parseInt(newJobHours) || 4;
                  
                  // Salvar direto no Supabase
                  const { data, error } = await supabase
                    .from('jobs')
                    .insert([{
                      ong_id: profile.id,
                      title: newJobTitle,
                      description: newJobDesc,
                      location: newJobLocation,
                      category: newJobCategory,
                      hours_each: hours,
                      date: newJobDate || null,
                      time: newJobTime || null,
                      time_end: newJobTimeEnd || null,
                      status: 'aberta'
                    }])
                    .select();
                  
                  if (error) {
                    alert("Erro ao criar vaga: " + error.message);
                    return;
                  }
                  
                  // Adicionar na lista local
                  if (data) setMyRoles([data[0], ...myRoles]);
                  
                  // Limpando inputs e fechando modal
                  setNewJobTitle('');
                  setNewJobDate('');
                  setNewJobTime('');
                  setNewJobTimeEnd('');
                  setNewJobLocation('');
                  setNewJobDesc('');
                  setNewJobHours('4');
                  setIsCreatingJob(false);
                  showToast('Vaga publicada com sucesso!', 'success');
                }}
              >
                Publicar Vaga
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
};

export default OngDashboard;
