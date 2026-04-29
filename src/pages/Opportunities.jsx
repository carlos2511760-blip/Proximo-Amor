import React, { useState } from 'react';
import { Search, MapPin, Calendar, Filter, ChevronDown, Heart } from 'lucide-react';

const vagas = [
  { id: 1, title: 'Jardim Comunitário', org: 'Moradores da Rua 10', location: 'Guarulhos, São Paulo, Jardim Las Vegas - Rua Leopoldo Silingardi...', date: '21/04/2026', category: 'Meio Ambiente', image: '/jardim.jpeg', desc: 'Busca-se voluntários para montar um jardim comunitário em nosso bairro para fortalecer o hortifruti da região!' },
  { id: 2, title: 'Artistas para Pintura...', org: 'ONG Crianças do Bem', location: 'Osasco, São Paulo, Jardim D\'abril - Av. Prestes Maia, 150 - 06040...', date: '23/04/2026', category: 'Cultura', image: '/pintura.webp', desc: 'Venha fazer pintura de rosto e ajudar a criar momentos felizes em nossa comunidade!' },
  { id: 3, title: 'Voluntários para entr...', org: 'Instituto Iara Teixeira de Lima', location: 'São Paulo, São Paulo, Sítio do Piqueri - Rua Antônio José Parr...', date: '28/04/2026', category: 'Social', image: '/alimento.webp', desc: 'Precisamos de voluntários para entregar alimentos na comunidade México 70 e espalhar cuidado.' },
  { id: 4, title: 'Enfermeiros para doa...', org: 'Ordem Paranormal | Tudo Começa...', location: 'São Paulo, São Paulo, Paraíso - Rua Tomás Carvalhal, 711 - 040...', date: '25/04/2026', category: 'Saúde', image: '/doacao.webp', desc: 'Campanha de doação de sangue para auxiliar pacientes em estado crítico.' },
  { id: 5, title: 'Jardim Comunitário', org: 'Moradores da Rua 10', location: 'Guarulhos, São Paulo, Jardim Las Vegas - Rua Leopoldo Silingardi...', date: '21/04/2026', category: 'Meio Ambiente', image: '/jardim.jpeg', desc: 'Busca-se voluntários para montar um jardim comunitário em nosso bairro para fortalecer o hortifruti da região!' },
  { id: 6, title: 'Artistas para Pintura...', org: 'ONG Crianças do Bem', location: 'Osasco, São Paulo, Jardim D\'abril - Av. Prestes Maia, 150 - 06040...', date: '23/04/2026', category: 'Cultura', image: '/pintura.webp', desc: 'Venha fazer pintura de rosto e ajudar a criar momentos felizes em nossa comunidade!' },
];

const causas = ['Educação', 'Meio Ambiente', 'Saúde', 'Social', 'Cultura', 'Proteção Animal'];
const areas = ['Presencial', 'Remoto', 'Híbrido'];

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCausas, setSelectedCausas] = useState([]);

  const filtered = vagas.filter(v =>
    v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.org.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCausa = (c) =>
    setSelectedCausas(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  return (
    <div className="vagas-page">
      <div className="vagas-header">
        <h1 className="vagas-title">Raízes disponíveis</h1>
        <p className="vagas-subtitle">Aqui estão todas as raízes esperando por você!</p>

        <div className="vagas-filters-bar">
          <button className="vagas-filter-btn" onClick={() => setShowFilters(!showFilters)}>
            <ChevronDown size={16} className={showFilters ? 'rotate-180' : ''} style={{ transition: 'transform 0.2s' }} />
            Causas
          </button>
          <button className="vagas-filter-btn">
            <ChevronDown size={16} /> Áreas
          </button>
          <button className="vagas-filter-btn vagas-filter-icon">
            <Filter size={16} /> Filtros
          </button>
        </div>

        {showFilters && (
          <div className="vagas-filter-dropdown">
            {causas.map(c => (
              <label key={c} className="vagas-filter-check">
                <input
                  type="checkbox"
                  checked={selectedCausas.includes(c)}
                  onChange={() => toggleCausa(c)}
                  className="vagas-checkbox"
                />
                {c}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="vagas-grid">
        {filtered.map(v => (
          <div key={v.id} className="vaga-card">
            <div className="vaga-card-img-wrap">
              <img src={v.image} alt={v.title} className="vaga-card-img" />
            </div>
            <div className="vaga-card-body">
              <h3 className="vaga-card-title">{v.title}</h3>
              <p className="vaga-card-org">por {v.org}</p>
              <p className="vaga-card-desc">{v.desc}</p>
              <div className="vaga-card-footer">
                <div className="vaga-card-info">
                  <MapPin size={14} className="vaga-info-icon" />
                  <span className="vaga-card-location">{v.location}</span>
                </div>
                <div className="vaga-card-info">
                  <Calendar size={14} className="vaga-info-icon" />
                  <span className="vaga-card-date">{v.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Opportunities;
