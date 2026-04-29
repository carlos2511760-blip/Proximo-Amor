import React, { useState } from 'react';
import { Heart, Target, Lightbulb, Users, Award, ChevronRight, ChevronLeft } from 'lucide-react';

const tabs = ['Projeto', 'Fundadores', 'Propósito', 'Objetivo'];

const tabContent = {
  Projeto: {
    title: 'Sobre o Próximo Amor',
    paragraphs: [
      'Somos uma iniciativa com o objetivo de conectar pessoas que desejam participar de pequenas causas que geram grandes impactos.',
      'Representados por uma árvore, símbolo da conexão entre todos. Nela, o tronco representa o Próximo Amor, os galhos são as empresas cadastradas e as folhas simbolizam os usuários dispostos a promover mudanças. Nisso, se constrói as raízes, o que fortalece todo o nosso projeto: as mudanças que toda essa junção faz nas vidas das pessoas.',
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
      'Somos uma iniciativa com o objetivo de conectar pessoas que desejam participar de pequenas causas que geram grandes impactos.',
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
  const [founderIdx, setFounderIdx] = useState(0);

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
            /* Founders Carousel */
            <div className="about-founders">
              <div className="about-founder-card">
                <div className="about-founder-img-wrap">
                  <img src={team[founderIdx].img} alt={team[founderIdx].name} className="about-founder-img" />
                  <div className="about-founder-overlay">
                    <h3 className="about-founder-name">{team[founderIdx].name}</h3>
                    <p className="about-founder-role">{team[founderIdx].role}</p>
                  </div>
                  {founderIdx < team.length - 1 && (
                    <button className="about-founder-arrow" onClick={() => setFounderIdx(founderIdx + 1)} aria-label="Próximo">
                      <ChevronRight size={24} />
                    </button>
                  )}
                  {founderIdx > 0 && (
                    <button className="about-founder-arrow about-founder-arrow-left" onClick={() => setFounderIdx(founderIdx - 1)} aria-label="Anterior">
                      <ChevronLeft size={24} />
                    </button>
                  )}
                </div>
                <div className="about-founder-dots">
                  {team.map((_, i) => (
                    <button key={i} className={`about-dot ${founderIdx === i ? 'about-dot-active' : ''}`} onClick={() => setFounderIdx(i)} aria-label={`Ver fundador ${i+1}`} />
                  ))}
                </div>
              </div>
              <div className="about-text-block">
                <h2 className="about-section-title">{content.title}</h2>
                {content.paragraphs.map((p, i) => <p key={i} className="about-text">{p}</p>)}
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
                <img src="/team.JPG" alt="Próximo Amor" className="about-img" />
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
