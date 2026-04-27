import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, ChevronDown } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header style={{ backgroundColor: 'var(--primary)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <img src="/icons/logoBBG.png" alt="Proximo Amor" style={{ height: '50px' }} onError={(e) => { e.target.style.display = 'none'; }} />
        {/* Placeholder if logo image is not found */}
      </div>
      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center', fontWeight: '500' }}>
        <a href="#enraizar">Enraizar</a>
        <a href="#quem-somos">Quem somos</a>
        <a href="#faq">FAQ</a>
        <a href="#voluntario">Quero ser voluntário!</a>
        <a href="#ong">Quero encontrar voluntários!</a>
      </nav>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/auth')} style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '2rem', fontWeight: 'bold' }}>Login</button>
        <button style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '2rem', fontWeight: 'bold' }}>Doe agora</button>
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section style={{ 
      position: 'relative', 
      height: '80vh', 
      minHeight: '600px',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundImage: 'url(/homeBG.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '0 2rem'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.7)' }}></div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#222' }}>
          Somos uma iniciativa dedicada<br/>a transformar vidas por meio do voluntariado.
        </h1>
        <h2 style={{ fontSize: '2rem', color: '#c82a2a', fontFamily: 'var(--font-heading)', marginBottom: '3rem' }}>
          Faça parte desse amor hoje!
        </h2>
        
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <Search size={24} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', color: '#666' }} />
          <input 
            type="text" 
            placeholder="Busque por folhas, galhos, etc..." 
            style={{ 
              width: '100%', 
              padding: '1.25rem 1.25rem 1.25rem 4rem', 
              fontSize: '1.25rem', 
              borderRadius: '3rem', 
              border: 'none',
              backgroundColor: '#EAEAEA',
              outline: 'none',
              fontFamily: 'var(--font-main)'
            }} 
          />
        </div>
      </div>
    </section>
  );
};

const SearchFilters = () => {
  return (
    <section style={{ padding: '4rem 2rem', textAlign: 'center', backgroundColor: '#fff' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#403F3E' }}>ou busque raízes por...</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '0.5rem', 
          backgroundColor: '#EAEAEA', padding: '1rem 3rem', borderRadius: '2rem', 
          fontSize: '1.25rem', fontWeight: 'bold', color: '#666' 
        }}>
          <ChevronDown size={24} /> Causas
        </button>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '0.5rem', 
          backgroundColor: '#EAEAEA', padding: '1rem 3rem', borderRadius: '2rem', 
          fontSize: '1.25rem', fontWeight: 'bold', color: '#666' 
        }}>
          <ChevronDown size={24} /> Áreas
        </button>
      </div>
    </section>
  );
};

const Jobs = () => {
  const jobs = [
    { 
      img: '/jardim.jpeg', 
      title: 'Jardim Comunitário', 
      author: 'Moradores da Rua 10', 
      desc: 'Busca-se voluntários para montar um jardim comunitário em nosso bairro para fortalecer o hortifruti da região!',
      loc: 'Guarulhos, São Paulo, Jardim Las Vegas - Rua Leopoldo Silingardi...',
      date: '21/04/2026'
    },
    { 
      img: '/pintura.webp', 
      title: 'Artistas para Pintura...', 
      author: 'ONG Crianças do Bem', 
      desc: 'Venha fazer pintura de rosto e ajudar a criar momentos felizes em nossa comunidade!',
      loc: 'Osasco, São Paulo, Jardim D\'abril - Av. Prestes Maia, 150 - 06040...',
      date: '23/04/2026'
    },
    { 
      img: '/alimento.webp', 
      title: 'Voluntários para entr...', 
      author: 'Instituto Iara Teixeira de Lima', 
      desc: 'Precisamos de voluntários para entregar alimentos na comunidade México 70 e espalhar cuidado.',
      loc: 'São Paulo, São Paulo, Sítio do Piqueri - Rua Antônio José Parr...',
      date: '28/04/2026'
    },
    { 
      img: '/doacao.webp', 
      title: 'Enfermeiros para doa...', 
      author: 'Ordem Paranormal | Tudo Começa...', 
      desc: 'No universo de Ordem Paranormal, o Sangue representa a força que se manifesta através das emoções extremas da própria...',
      loc: 'São Paulo, São Paulo, Paraíso - Rua Tomás Carvalhal, 711 - 040...',
      date: '25/04/2026'
    }
  ];

  return (
    <section style={{ 
      padding: '4rem 2rem', 
      backgroundColor: '#fff',
      backgroundImage: 'url(/leaves.png)',
      backgroundSize: '100%',
      backgroundRepeat: 'repeat-y',
      position: 'relative'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', color: '#403F3E' }}>Raízes da semana</h2>
        <p style={{ fontSize: '1.25rem', color: '#666', fontWeight: 'bold', marginBottom: '3rem' }}>
          Veja as oportunidades selecionadas pelo Próximo Amor para esta semana!
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
          {jobs.map((job, idx) => (
            <div key={idx} style={{ backgroundColor: '#EAEAEA', borderRadius: '1.5rem', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img src={job.img} alt={job.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{job.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>por {job.author}</p>
                <p style={{ fontSize: '1rem', color: '#333', marginBottom: '2rem', flex: 1 }}>{job.desc}</p>
                
                <div style={{ borderTop: '1px solid #ccc', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <MapPin size={20} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                    <span style={{ fontSize: '0.875rem', color: '#333' }}>{job.loc}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold' }}>
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

const Stats = () => {
  return (
    <section style={{ padding: '6rem 2rem', textAlign: 'center', backgroundColor: '#fff' }}>
      <h2 style={{ fontSize: '3rem', color: '#403F3E', marginBottom: '4rem' }}>Seja mais um a participar do nosso amor!</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', flexWrap: 'wrap', marginBottom: '6rem' }}>
        <div>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: '#403F3E' }}>+30.000</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#666' }}>VOLUNTÁRIOS CADASTRADOS</div>
        </div>
        <div>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: '#403F3E' }}>+375</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#666' }}>ONGs CADASTRADAS</div>
        </div>
        <div>
          <div style={{ fontSize: '4rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: '#403F3E' }}>+100.000</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#666' }}>RAÍZES FORTALECIDAS</div>
        </div>
      </div>

      <h2 style={{ fontSize: '3rem', color: '#403F3E', marginBottom: '1rem' }}>Trabalhe conosco e continue esse projeto!</h2>
      <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto', color: '#333' }}>
        Seja mais um a participar do nosso amor, caminhando ao lado de quem acredita que cada ato de
        carinho constrói um futuro mais acolhedor para todos.
      </p>
    </section>
  );
};

const LandingPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Header />
      <Hero />
      <SearchFilters />
      <Jobs />
      <Stats />
    </div>
  );
};

export default LandingPage;
