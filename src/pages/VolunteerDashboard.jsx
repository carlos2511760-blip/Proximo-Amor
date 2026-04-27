import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, User, Search, History, LogOut, MapPin, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--muted)' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', backgroundColor: 'var(--card)', borderRight: '1px solid var(--border)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '3rem' }}>
          <Heart fill="var(--primary)" size={28} />
          <span>Próximo Amor</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
          <button 
            onClick={() => setActiveTab('profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: activeTab === 'profile' ? 'rgba(13, 148, 136, 0.1)' : 'transparent', color: activeTab === 'profile' ? 'var(--primary)' : 'var(--muted-foreground)', fontWeight: '600' }}
          >
            <User size={20} /> Meu Perfil
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: activeTab === 'jobs' ? 'rgba(13, 148, 136, 0.1)' : 'transparent', color: activeTab === 'jobs' ? 'var(--primary)' : 'var(--muted-foreground)', fontWeight: '600' }}
          >
            <Search size={20} /> Buscar Vagas
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: activeTab === 'history' ? 'rgba(13, 148, 136, 0.1)' : 'transparent', color: activeTab === 'history' ? 'var(--primary)' : 'var(--muted-foreground)', fontWeight: '600' }}
          >
            <History size={20} /> Histórico
          </button>
        </nav>

        <button 
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', color: '#ef4444', fontWeight: '600', marginTop: 'auto', background: 'none' }}
        >
          <LogOut size={20} /> Sair
        </button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem', overflowY: 'auto' }}>
        <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '700' }}>
              {activeTab === 'profile' && 'Meu Perfil'}
              {activeTab === 'jobs' && 'Vagas Disponíveis'}
              {activeTab === 'history' && 'Meu Impacto'}
            </h1>
            <p style={{ color: 'var(--muted-foreground)' }}>Olá, João Silva! Bem-vindo de volta.</p>
          </div>
          <div style={{ backgroundColor: 'var(--card)', padding: '0.5rem 1rem', borderRadius: '1rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '700' }}>128h</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>doadas no total</div>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>JS</div>
          </div>
        </header>

        {activeTab === 'jobs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
            {jobs.map(job => (
              <div key={job.id} style={{ backgroundColor: 'var(--card)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', backgroundColor: 'rgba(13, 148, 136, 0.1)', padding: '0.25rem 0.75rem', borderRadius: '2rem' }}>{job.category}</span>
                  <Heart size={18} color="var(--border)" />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{job.title}</h3>
                <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>ONG {job.ong}</p>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                    <MapPin size={14} /> {job.type}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
                    <Clock size={14} /> {job.time}
                  </div>
                </div>
                <button style={{ width: '100%', backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem', borderRadius: '0.75rem', fontWeight: '600' }}>Candidatar-se</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div style={{ backgroundColor: 'var(--card)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--border)' }}>
             <h3 style={{ marginBottom: '1.5rem' }}>Minhas Competências</h3>
             <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['Design', 'Inglês Fluente', 'Gestão de Projetos', 'Comunicação'].map(s => (
                  <span key={s} style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--muted)', borderRadius: '0.75rem', fontWeight: '500' }}>{s}</span>
                ))}
                <button style={{ padding: '0.5rem 1rem', border: '1px dashed var(--primary)', color: 'var(--primary)', borderRadius: '0.75rem', fontWeight: '600', background: 'none' }}>+ Adicionar</button>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default VolunteerDashboard;
