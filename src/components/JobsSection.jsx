import React from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './LandingPage.css';

const base = import.meta.env.BASE_URL;

const JobsSection = () => {
  const { t } = useTranslation();
  const jobs = [
    { 
      img: `${base}jardim.jpeg`, 
      title: 'Jardim Comunitário', 
      author: 'Moradores da Rua 10', 
      desc: 'Busca-se voluntários para montar um jardim comunitário em nosso bairro para fortalecer o hortifruti da região!',
      loc: 'Guarulhos, São Paulo, Jardim Las Vegas - Rua Leopoldo Silingardi...',
      date: '21/04/2026'
    },
    { 
      img: `${base}pintura.webp`, 
      title: 'Artistas para Pintura...', 
      author: 'ONG Crianças do Bem', 
      desc: 'Venha fazer pintura de rosto e ajudar a criar momentos felizes em nossa comunidade!',
      loc: "Osasco, São Paulo, Jardim D'abril - Av. Prestes Maia, 150 - 06040...",
      date: '23/04/2026'
    },
    { 
      img: `${base}alimento.webp`, 
      title: 'Voluntários para entr...', 
      author: 'Instituto Iara Teixeira de Lima', 
      desc: 'Precisamos de voluntários para entregar alimentos na comunidade México 70 e espalhar cuidado.',
      loc: 'São Paulo, São Paulo, Sítio do Piqueri - Rua Antônio José Parr...',
      date: '28/04/2026'
    },
    { 
      img: `${base}doacao.webp`, 
      title: 'Enfermeiros para doa...', 
      author: 'Ordem Paranormal | Tudo Começa...', 
      desc: 'No universo de Ordem Paranormal, o Sangue representa a força que se manifesta através das emoções extremas da própria...',
      loc: 'São Paulo, São Paulo, Paraíso - Rua Tomás Carvalhal, 711 - 040...',
      date: '25/04/2026'
    }
  ];

  return (
    <section className="jobs-section" style={{ backgroundImage: `url(${base}leaves.png)` }}>
      <div className="container jobs-container">
        <h2 className="jobs-title">{t('jobs_title')}</h2>
        <p className="jobs-subtitle">
          {t('jobs_subtitle')}
        </p>
        
        <div className="jobs-grid">
          {jobs.map((job, idx) => (
            <div key={idx} className="job-card">
              <img src={job.img} alt={job.title} className="job-image" />
              <div className="job-content">
                <h3 className="job-title">{job.title}</h3>
                <p className="job-author">{t('job_by')} {job.author}</p>
                <p className="job-desc">{job.desc}</p>
                
                <div className="job-footer">
                  <div className="job-location">
                    <MapPin size={20} color="var(--primary)" className="job-location-icon" />
                    <span className="job-location-text">{job.loc}</span>
                  </div>
                  <div className="job-date">
                    <Calendar size={20} />
                    <span>{job.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
