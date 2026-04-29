import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, User, Search, History, LogOut, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const VolunteerDashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');

  const jobs = [
    { id: 1, title: 'Professor de Inglês', ong: 'Educa Mais', type: 'Remoto', time: '4h/semana', category: 'Educação' },
    { id: 2, title: 'Cozinheiro Comunitário', ong: 'Prato Cheio', type: 'Presencial', time: '6h/semana', category: 'Alimentação' },
    { id: 3, title: 'Designer Gráfico', ong: 'Green Earth', type: 'Remoto', time: 'Flexible', category: 'Design' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Heart fill="var(--primary)" size={28} />
          <span>Próximo Amor</span>
        </div>

        <nav className="sidebar-nav">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`sidebar-btn ${activeTab === 'profile' ? 'active' : ''}`}
          >
            <User size={20} /> Meu Perfil
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`sidebar-btn ${activeTab === 'jobs' ? 'active' : ''}`}
          >
            <Search size={20} /> Buscar Vagas
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`sidebar-btn ${activeTab === 'history' ? 'active' : ''}`}
          >
            <History size={20} /> Histórico
          </button>
        </nav>

        <button 
          onClick={() => navigate('/')}
          className="sidebar-logout"
        >
          <LogOut size={20} /> Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              {activeTab === 'profile' && 'Meu Perfil'}
              {activeTab === 'jobs' && 'Vagas Disponíveis'}
              {activeTab === 'history' && 'Meu Impacto'}
            </h1>
            <p className="dashboard-subtitle">Olá, João Silva! Bem-vindo de volta.</p>
          </div>
          <div className="volunteer-stats">
            <div className="volunteer-stats-text">
              <div className="volunteer-stats-hours">128h</div>
              <div className="volunteer-stats-label">doadas no total</div>
            </div>
            <div className="volunteer-avatar">JS</div>
          </div>
        </header>

        {activeTab === 'jobs' && (
          <div className="jobs-grid">
            {jobs.map(job => (
              <div key={job.id} className="dashboard-job-card">
                <div className="job-card-header">
                  <span className="job-category-badge">{job.category}</span>
                  <Heart size={18} color="var(--border)" />
                </div>
                <h3 className="job-card-title">{job.title}</h3>
                <p className="job-card-ong">ONG {job.ong}</p>
                <div className="job-card-details">
                  <div className="job-detail-item">
                    <MapPin size={14} /> {job.type}
                  </div>
                  <div className="job-detail-item">
                    <Clock size={14} /> {job.time}
                  </div>
                </div>
                <button className="btn-primary-full">Candidatar-se</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-section">
             <h3>Minhas Competências</h3>
             <div className="skills-list">
                {['Design', 'Inglês Fluente', 'Gestão de Projetos', 'Comunicação'].map(s => (
                  <span key={s} className="skill-badge">{s}</span>
                ))}
                <button className="btn-dashed">+ Adicionar</button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VolunteerDashboard;
