import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, MapPin, Calendar, Users, Heart, ArrowRight, Filter } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const Home = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const raizesDaSemana = [
    {
      id: 1,
      title: "Jardim Comunitário",
      org: "Moradores da Rua 10",
      desc: "Busca-se voluntários para montar um jardim comunitário em nosso bairro para fortalecer o hortifruti da região!",
      location: "Guarulhos, São Paulo",
      date: "21/04/2026",
      image: "/resources/images/jardim.jpeg",
      category: "Meio Ambiente"
    },
    {
      id: 2,
      title: "Artistas para Pintura...",
      org: "ONG Crianças do Bem",
      desc: "Venha fazer pintura de rosto e ajudar a criar momentos felizes em nossa comunidade!",
      location: "Osasco, São Paulo",
      date: "23/04/2026",
      image: "/resources/images/pintura.webp",
      category: "Cultura"
    },
    {
      id: 3,
      title: "Voluntários para entrega...",
      org: "Instituto Iara Teixeira de Lima",
      desc: "Precisamos de voluntários para entregar alimentos na comunidade México 70 e espalhar cuidado.",
      location: "São Paulo, São Paulo",
      date: "28/04/2026",
      image: "/resources/images/alimento.webp",
      category: "Social"
    }
  ];

  return (
    <div className="min-h-screen bg-bg-main">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* BG Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/resources/images/homeBG.jpeg" 
            alt="Voluntariado" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy-60 backdrop-blur-2px"></div>
        </div>

        <div className="container relative z-10 text-center text-white flex flex-col items-center gap-8">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl">
            {t('search_title')}
          </h1>
          <p className="text-xl md:text-2xl text-white-90 font-medium">
            {t('search_subtitle')}
          </p>

          {/* Search Box */}
          <div className="w-full max-w-2xl bg-white-10 backdrop-blur-md p-2 rounded-[30px] border border-white-20 shadow-2xl mt-4">
            <div className="flex items-center bg-white rounded-[24px] px-6 py-2">
              <Search className="text-text-light mr-4" size={24} />
              <input 
                type="text" 
                placeholder={t('search_placeholder')} 
                className="flex-1 border-none outline-none py-3 text-lg text-navy placeholder:text-text-light"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <h2 className="text-3xl font-bold text-navy flex items-center gap-3">
              ou busque raízes por...
            </h2>
            <div className="flex gap-4">
              <button className="btn btn-secondary flex items-center gap-2 px-8 py-3 bg-slate-50 border-none shadow-sm">
                <ChevronDown size={20} className="mt-1" />
                {t('search_causes')}
              </button>
              <button className="btn btn-secondary flex items-center gap-2 px-8 py-3 bg-slate-50 border-none shadow-sm">
                <ChevronDown size={20} className="mt-1" />
                {t('search_areas')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Raízes da Semana */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl font-bold text-navy mb-4">{t('jobs_title')}</h2>
              <p className="text-text-muted text-lg">{t('jobs_subtitle')}</p>
            </div>
            <Link to="/vagas" className="btn btn-secondary border-none text-primary font-bold group">
              {t('jobs_view_all')} <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3 gap-8">
            {raizesDaSemana.map((raiz) => (
              <div key={raiz.id} className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all group border border-slate-100">
                <div className="h-64 relative overflow-hidden">
                  <img src={raiz.image} alt={raiz.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-navy shadow-sm">
                    {raiz.category}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-navy mb-2">{raiz.title}</h3>
                  <p className="text-primary font-semibold text-sm mb-4">por {raiz.org}</p>
                  <p className="text-text-muted text-[0.95rem] line-clamp-3 mb-8 leading-relaxed">
                    {raiz.desc}
                  </p>
                  
                  <div className="pt-6 border-t border-slate-50 flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-text-light text-sm">
                      <MapPin size={18} className="text-primary" />
                      {raiz.location}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                       <div className="flex items-center gap-3 text-text-light text-sm font-bold">
                        <Calendar size={18} className="text-primary" />
                        {raiz.date}
                      </div>
                      <button className="heart-btn text-slate-300 hover:text-red-400 transition-colors">
                        <Heart size={24} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          {/* Pattern or texture */}
        </div>
        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Nosso Impacto em Números</h2>
            <p className="text-text-light text-lg max-w-2xl mx-auto">Juntos estamos construindo uma rede de solidariedade cada vez mais forte.</p>
          </div>

          <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4 gap-8">
             {[
               { label: "Voluntários ativos", value: "2.4k+", icon: <Users size={32} /> },
               { label: "ONGs parceiras", value: "150+", icon: <Filter size={32} /> },
               { label: "Horas doadas", value: "15k+", icon: <Calendar size={32} /> },
               { label: "Vidas impactadas", value: "10k+", icon: <Heart size={32} /> }
             ].map((stat, i) => (
               <div key={i} className="bg-white-5 border border-white-10 p-8 rounded-[32px] text-center flex flex-col items-center gap-4 hover:bg-white-10 transition-all">
                 <div className="text-primary bg-primary-10 p-4 rounded-2xl">{stat.icon}</div>
                 <div className="text-4xl font-bold text-white">{stat.value}</div>
                 <div className="text-text-light font-medium uppercase tracking-wider text-xs">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Simple ChevronDown component since it was not imported
const ChevronDown = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m6 9 6 6 6-6"/></svg>
);

// Simple Link if react-router is not available (mock)
const LinkShim = ({ href, children, ...props }) => <a href={href} {...props}>{children}</a>;

export default Home;
