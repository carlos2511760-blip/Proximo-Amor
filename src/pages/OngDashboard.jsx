import React, { useState } from 'react';
import { Heart, Plus, Users, LayoutDashboard, FileCheck, LogOut, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const OngDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const candidates = [
    { id: 1, name: 'Ana Souza', role: 'Designer', status: 'Pendente', email: 'ana@example.com' },
    { id: 2, name: 'Pedro Lima', role: 'Cozinheiro', status: 'Aprovado', email: 'pedro@example.com' },
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
            onClick={() => setActiveTab('dashboard')}
            className={`sidebar-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            <LayoutDashboard size={20} /> Painel Geral
          </button>
          <button 
            onClick={() => setActiveTab('candidates')}
            className={`sidebar-btn ${activeTab === 'candidates' ? 'active' : ''}`}
          >
            <Users size={20} /> Candidatos
          </button>
          <button 
            onClick={() => setActiveTab('verification')}
            className={`sidebar-btn ${activeTab === 'verification' ? 'active' : ''}`}
          >
            <FileCheck size={20} /> Verificação
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
              {activeTab === 'dashboard' && 'Minhas Vagas'}
              {activeTab === 'candidates' && 'Triagem de Candidatos'}
              {activeTab === 'verification' && 'Verificação da ONG'}
            </h1>
            <p className="dashboard-subtitle">Bem-vinda, ONG Educa Mais!</p>
          </div>
          {activeTab === 'dashboard' && (
            <button className="btn-primary-small">
              <Plus size={20} /> Criar Vaga
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && (
          <div className="dashboard-table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Título da Vaga</th>
                  <th>Status</th>
                  <th>Inscritos</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: '600' }}>Professor de Inglês</td>
                  <td><span className="status-badge status-active">ATIVO</span></td>
                  <td>12 voluntários</td>
                  <td className="action-link">Editar</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div className="candidate-list">
            {candidates.map(c => (
              <div key={c.id} className="candidate-card">
                <div className="candidate-info">
                  <div className="candidate-avatar">{c.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div className="candidate-name">{c.name}</div>
                    <div className="candidate-role">{c.role}</div>
                  </div>
                </div>
                <div className="candidate-actions">
                  <button className="icon-btn"><Mail size={18} /></button>
                  <button className="icon-btn success"><CheckCircle2 size={18} /></button>
                  <button className="icon-btn danger"><XCircle size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OngDashboard;
