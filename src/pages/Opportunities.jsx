import React, { useState } from 'react';
import { Search, MapPin, Calendar, Filter, ChevronRight, Heart } from 'lucide-react';
import Layout from '../components/layout/Layout';

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const vagas = [
    { id: 1, title: "Jardim Comunitário", org: "Moradores da Rua 10", location: "Guarulhos, SP", date: "21/04/2026", category: "Meio Ambiente", image: "/resources/images/jardim.jpeg" },
    { id: 2, title: "Artistas para Pintura", org: "ONG Crianças do Bem", location: "Osasco, SP", date: "23/04/2026", category: "Cultura", image: "/resources/images/pintura.webp" },
    { id: 3, title: "Entrega de Alimentos", org: "Inst. Iara Teixeira", location: "São Paulo, SP", date: "28/04/2026", category: "Social", image: "/resources/images/alimento.webp" },
    { id: 4, title: "Campanha de Doação", org: "Ordem Paranormal", location: "São Paulo, SP", date: "25/04/2026", category: "Saúde", image: "/resources/images/doacao.webp" },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-12 bg-white">
        <div className="container">
          <h1 className="text-4xl font-bold text-navy mb-8">Raízes Disponíveis</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-1/4 flex flex-col gap-8">
              <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                <h3 className="font-bold text-navy mb-6 flex items-center gap-2">
                  <Filter size={18} className="text-primary" /> Filtros
                </h3>
                
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="text-xs font-bold uppercase text-text-light mb-3 block">Causa</label>
                    <div className="flex flex-col gap-2">
                      {['Educação', 'Meio Ambiente', 'Saúde', 'Social'].map(c => (
                        <label key={c} className="flex items-center gap-3 text-sm text-text-muted cursor-pointer hover:text-primary">
                          <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-primary" /> {c}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <label className="text-xs font-bold uppercase text-text-light mb-3 block">Localização</label>
                    <select className="w-full p-3 rounded-xl bg-white border border-slate-200 text-sm outline-none">
                      <option>Todas as cidades</option>
                      <option>São Paulo, SP</option>
                      <option>Osasco, SP</option>
                      <option>Guarulhos, SP</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Impact Card in sidebar */}
              <div className="bg-primary p-8 rounded-[32px] text-white overflow-hidden relative group">
                <Heart size={80} className="absolute -top-4 -right-4 opacity-10 rotate-12 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-xl mb-4 relative z-10">Seja a mudança!</h4>
                <p className="text-sm text-white/80 mb-6 relative z-10">Milhares de pessoas precisam do seu talento hoje.</p>
                <button className="w-full py-3 bg-white text-primary font-bold rounded-2xl text-sm">Quero Doar</button>
              </div>
            </aside>

            {/* List */}
            <div className="lg:flex-1">
              {/* Search Bar */}
              <div className="bg-white border border-slate-100 rounded-2xl p-2 flex items-center shadow-sm mb-8">
                 <div className="flex-1 flex items-center px-4">
                   <Search className="text-slate-300 mr-3" size={20} />
                   <input 
                     type="text" 
                     placeholder="Buscar por título ou organização..." 
                     className="w-full py-3 outline-none text-navy placeholder:text-slate-300"
                   />
                 </div>
                 <button className="btn btn-primary py-3 px-8 rounded-xl font-bold">Buscar</button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md-grid-cols-2 gap-6">
                {vagas.map(v => (
                  <div key={v.id} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col md:flex-row h-full">
                    <div className="md:w-40 h-48 md:h-full relative overflow-hidden flex-shrink-0">
                      <img src={v.image} alt={v.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary-5 px-3 py-1 rounded-full">{v.category}</span>
                        <button className="text-slate-200 hover:text-red-400 transition-colors"><Heart size={18} /></button>
                      </div>
                      <h3 className="font-bold text-navy text-lg mb-1 leading-tight">{v.title}</h3>
                      <p className="text-xs text-text-light mb-4">por {v.org}</p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-50 flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs text-text-muted">
                          <MapPin size={14} className="text-slate-300" /> {v.location}
                        </div>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2 text-xs text-text-muted font-bold">
                            <Calendar size={14} className="text-slate-300" /> {v.date}
                          </div>
                          <button className="p-2 bg-slate-50 text-navy rounded-full hover:bg-primary hover:text-white transition-all">
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Opportunities;
