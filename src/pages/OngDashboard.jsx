import React, { useState } from 'react';
import { Heart, Plus, Users, LayoutDashboard, FileCheck, LogOut, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OngDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  const candidates = [
    { id: 1, name: 'Ana Souza', role: 'Designer', status: 'Pendente', email: 'ana@example.com' },
    { id: 2, name: 'Pedro Lima', role: 'Cozinheiro', status: 'Aprovado', email: 'pedro@example.com' },
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
            onClick={() => setActiveTab('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: activeTab === 'dashboard' ? 'rgba(13, 148, 136, 0.1)' : 'transparent', color: activeTab === 'dashboard' ? 'var(--primary)' : 'var(--muted-foreground)', fontWeight: '600' }}
          >
            <LayoutDashboard size={20} /> Painel Geral
          </button>
          <button 
            onClick={() => setActiveTab('candidates')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: activeTab === 'candidates' ? 'rgba(13, 148, 136, 0.1)' : 'transparent', color: activeTab === 'candidates' ? 'var(--primary)' : 'var(--muted-foreground)', fontWeight: '600' }}
          >
            <Users size={20} /> Candidatos
          </button>
          <button 
            onClick={() => setActiveTab('verification')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderRadius: '0.75rem', backgroundColor: activeTab === 'verification' ? 'rgba(13, 148, 136, 0.1)' : 'transparent', color: activeTab === 'verification' ? 'var(--primary)' : 'var(--muted-foreground)', fontWeight: '600' }}
          >
            <FileCheck size={20} /> Verificação
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
              {activeTab === 'dashboard' && 'Minhas Vagas'}
              {activeTab === 'candidates' && 'Triagem de Candidatos'}
              {activeTab === 'verification' && 'Verificação da ONG'}
            </h1>
            <p style={{ color: 'var(--muted-foreground)' }}>Bem-vinda, ONG Educa Mais!</p>
          </div>
          {activeTab === 'dashboard' && (
            <button style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Plus size={20} /> Criar Vaga
            </button>
          )}
        </header>

        {activeTab === 'dashboard' && (
          <div style={{ backgroundColor: 'var(--card)', borderRadius: '1.5rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: 'var(--muted)' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1.25rem', color: 'var(--muted-foreground)' }}>Título da Vaga</th>
                  <th style={{ textAlign: 'left', padding: '1.25rem', color: 'var(--muted-foreground)' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '1.25rem', color: 'var(--muted-foreground)' }}>Inscritos</th>
                  <th style={{ textAlign: 'left', padding: '1.25rem', color: 'var(--muted-foreground)' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1.25rem', fontWeight: '600' }}>Professor de Inglês</td>
                  <td style={{ padding: '1.25rem' }}><span style={{ color: '#22c55e', backgroundColor: '#f0fdf4', padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontSize: '0.75rem', fontWeight: '700' }}>ATIVO</span></td>
                  <td style={{ padding: '1.25rem' }}>12 voluntários</td>
                  <td style={{ padding: '1.25rem', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Editar</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'candidates' && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {candidates.map(c => (
              <div key={c.id} style={{ backgroundColor: 'var(--card)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{c.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <div style={{ fontWeight: '700' }}>{c.name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{c.role}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{ padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid var(--border)', background: 'none' }}><Mail size={18} /></button>
                  <button style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#f0fdf4', color: '#22c55e', border: 'none' }}><CheckCircle2 size={18} /></button>
                  <button style={{ padding: '0.5rem', borderRadius: '0.5rem', backgroundColor: '#fef2f2', color: '#ef4444', border: 'none' }}><XCircle size={18} /></button>
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
