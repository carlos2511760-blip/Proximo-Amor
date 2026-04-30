import React, { useState } from 'react';
import { Heart, Target, Lightbulb, Users, Award, ChevronRight, ChevronLeft } from 'lucide-react';

const tabs = ['Projeto', 'Fundadores', 'Propósito', 'Objetivo'];

const tabContent = {
  Projeto: {
    title: 'Sobre o Próximo Amor',
    paragraphs: [
      'Somos uma iniciativa privada com o objetivo de conectar pessoas que desejam participar de pequenas causas que geram grandes impactos.',
      'Somos representados por uma árvore, símbolo da conexão entre todos. Nela, o tronco representa o Próximo Amor, os galhos são as empresas cadastradas e as folhas simbolizam os usuários dispostos a promover mudanças.',
      'O projeto nasceu da vontade de gerar transformações sociais, incentivando a solidariedade e o engajamento coletivo. Nossa missão é conectar pessoas dispostas a ajudar com empresas parceiras inscritas em nosso programa.',
      'Em nosso site, empresas e voluntários se encontram por meio de vagas selecionadas, facilitando essa conexão. Acreditamos na mudança e na solidariedade. Junte-se a nós e faça parte dessa grande família.',
    ]
  },
  Fundadores: {
    title: 'Quem Criou',
    paragraphs: [
      'O projeto teve início com a proposta escolar de criar um sistema operacional na web, que fosse importante e interessante. Nesse contexto, surgiu o Próximo Amor. Um passo com foco na solidariedade e caridade daqueles que desejam fazer o bem.',
    ]
  },
  Propósito: {
    title: 'Nossa Essência',
    paragraphs: [
      'Nossa missão é auxiliar e trazer suporte e socorro para aqueles que mais necessitam, espalhando o amor, e a bondade individual por meio do voluntário, utilizando nosso projeto para conectar esses objetivos.',
    ]
  },
  Objetivo: {
    title: 'Onde Queremos Chegar',
    paragraphs: [
      'Buscamos ser a maior plataforma de voluntariado do Brasil, conectando milhares de voluntários a centenas de ONGs e projetos sociais em todo o país.',
    ]
  }
};

const team = [
  { name: 'Flávio Azevedo', role: 'Fundador e CEO', img: 'flavio.JPG' },
  { name: 'Guilherme Lima', role: 'Fundador e CTO', img: 'guilherme.JPG' },
];

const values = [
  { title: 'Solidariedade', desc: 'Acreditamos que o apoio mútuo é a base para uma sociedade mais justa e humana.', icon: <Heart size={28} /> },
  { title: 'Transparência', desc: 'Trabalhamos com clareza em todas as conexões entre voluntários e instituições.', icon: <Award size={28} /> },
  { title: 'Inovação Social', desc: 'Utilizamos a tecnologia para potencializar o impacto de causas humanitárias.', icon: <Lightbulb size={28} /> },
];

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('Projeto');
  const content = tabContent[activeTab];

  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero">
        <img src="team.JPG" alt="Equipe Próximo Amor" className="about-hero-img" />
        <div className="about-hero-overlay" />
        <div className="about-hero-content">
          <h1 className="about-hero-title">Sobre Nós</h1>
          <nav className="about-hero-tabs">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`about-tab-btn ${activeTab === tab ? 'about-tab-active' : ''}`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Content Area */}
      <section className="about-content-section">
        <div className="about-content-wrap">

          {activeTab === 'Fundadores' ? (
            /* Founders List (One below the other) */
            <div className="about-founders-list">
              <div className="about-text-block mb-12">
                <h2 className="about-section-title">{content.title}</h2>
                {content.paragraphs.map((p, i) => <p key={i} className="about-text">{p}</p>)}
              </div>
              <div className="flex flex-col gap-12 items-center">
                {team.map((founder, i) => (
                  <div key={i} className="about-founder-item flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 w-full max-w-4xl">
                    <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-4 border-white">
                      <img src={founder.img} alt={founder.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-2xl font-bold text-navy mb-2">{founder.name}</h3>
                      <p className="text-primary font-semibold text-lg mb-4">{founder.role}</p>
                      <p className="text-text-muted">Líder dedicado à transformação social através da tecnologia e do amor ao próximo.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Regular text + image */
            <div className="about-project">
              <div className="about-text-block">
                <h2 className="about-section-title">{content.title}</h2>
                {content.paragraphs.map((p, i) => <p key={i} className="about-text">{p}</p>)}
              </div>
              <div className="about-img-wrap">
                <img src="team.JPG" alt="Próximo Amor" className="about-img" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="about-values-container">
          <h2 className="about-values-title">Nossos Valores</h2>
          <div className="about-values-divider" />
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div key={i} className="about-value-card">
                <div className="about-value-icon">{v.icon}</div>
                <h3 className="about-value-title">{v.title}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
