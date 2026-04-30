import React, { useState } from 'react';
<<<<<<< Updated upstream
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
=======
import { Heart, Target, Lightbulb, Users, ChevronRight, Award } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('Projeto');

  const tabs = [
    { name: 'Projeto', icon: <Heart size={20} />, title: 'Sobre o Próximo Amor', content: 'Representados por uma árvore, símbolo da conexão entre todos. Nela, o tronco representa o Próximo Amor, os galhos são as instituições cadastradas e as folhas simbolizam os voluntários dispostos a promover mudanças. Nisso, se constrói as raízes, o que fortalece todo o nosso projeto: as mudanças que toda essa junção faz nas vidas das pessoas.' },
    { name: 'Fundadores', icon: <Users size={20} />, title: 'Quem Criou', content: 'O projeto teve início com a proposta escolar de criar um sistema operacional na web, que fosse importante e interessante. Nesse contexto, surgiu o Próximo Amor. Um passo com foco na solidariedade e caridade daqueles que desejam fazer o bem.' },
    { name: 'Propósito', icon: <Lightbulb size={20} />, title: 'Nossa Essência', content: 'Nossa missão é auxiliar e trazer suporte e socorro para aqueles que mais necessitam, espalhando o amor, e a bondade individual por meio do voluntário, utilizando nosso projeto para conectar esses objetivos.' },
    { name: 'Objetivo', icon: <Target size={20} />, title: 'Onde Queremos Chegar', content: 'Somos uma iniciativa com o objetivo de conectar pessoas que desejam participar de pequenas causas que geram grandes impactos.' }
  ];

  const team = [
    { name: 'Flávio Azevedo', role: 'Fundador e CEO', img: 'flavio.JPG' },
    { name: 'Guilherme Lima', role: 'Fundador e CTO', img: 'guilherme.JPG' }
  ];

  return (
    <div className="min-h-screen bg-bg-main">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20 overflow-hidden bg-navy">
         <div className="container relative z-10 text-center text-white">
            <h1 className="text-6xl font-bold mb-6">Sobre Nós</h1>
            <div className="flex items-center justify-center gap-4 text-white-60">
              <span>Home</span>
              <ChevronRight size={16} />
              <span className="text-white">Quem Somos</span>
            </div>
         </div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      {/* Content Section with Tabs */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="container">
          <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100">
            {/* Tab Navigation */}
            <div className="flex flex-wrap border-b border-slate-100">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex-1 min-w-[150px] py-8 flex flex-col items-center gap-3 transition-all ${
                    activeTab === tab.name 
                    ? 'bg-primary text-white scale-[1.02] shadow-lg z-10' 
                    : 'text-text-muted hover:bg-slate-50'
                  }`}
                >
                  {tab.icon}
                  <span className="font-bold uppercase tracking-wider text-xs">{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-12 md:p-20 flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                <div className="bg-primary/5 p-4 rounded-2xl inline-flex text-primary mb-6">
                  {tabs.find(t => t.name === activeTab).icon}
                </div>
                <h2 className="text-4xl font-bold text-navy mb-8">
                  {tabs.find(t => t.name === activeTab).title}
                </h2>
                <div className="text-lg text-text-muted leading-relaxed space-y-6">
                  {tabs.find(t => t.name === activeTab).content.split('\n').map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2 w-full">
                {activeTab === 'Fundadores' ? (
                   <div className="flex flex-col gap-8">
                     {team.map((member, i) => (
                       <div key={i} className="group relative rounded-3xl overflow-hidden shadow-lg h-96">
                         <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                         <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent flex flex-col justify-end p-8">
                            <h4 className="text-white font-bold text-2xl">{member.name}</h4>
                            <p className="text-primary text-lg font-medium">{member.role}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                ) : (
                  <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                    <img 
                      src="team.JPG" 
                      alt="Team Work" 
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 animate-pulse">
                         <Heart size={32} fill="currentColor" />
                       </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-bg-main">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy mb-4">Nossos Valores</h2>
            <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Solidariedade', desc: 'Acreditamos que o apoio mútuo é a base para uma sociedade mais justa e humana.', icon: <Heart className="text-red-500" /> },
              { title: 'Transparência', desc: 'Trabalhamos com clareza em todas as conexões entre voluntários e instituições.', icon: <Award className="text-blue-500" /> },
              { title: 'Inovação Social', desc: 'Utilizamos a tecnologia para potencializar o impacto de causas humanitárias.', icon: <Lightbulb className="text-yellow-500" /> }
            ].map((v, i) => (
              <div key={i} className="bg-white p-10 rounded-[32px] shadow-sm hover:shadow-md transition-all border border-slate-50 text-center flex flex-col items-center gap-6">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center">{v.icon}</div>
                <h3 className="text-xl font-bold text-navy">{v.title}</h3>
                <p className="text-text-muted leading-relaxed">{v.desc}</p>
>>>>>>> Stashed changes
              </div>
            ))}
          </div>
        </div>
      </section>
<<<<<<< Updated upstream
=======

      <Footer />
>>>>>>> Stashed changes
    </div>
  );
};

export default AboutUs;
