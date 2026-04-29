import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    q: 'Preciso ter experiência prévia para me voluntariar?',
    a: 'Não! O voluntariado no Próximo Amor é aberto a todos, independente de experiência. O mais importante é a disposição para ajudar. Cada ONG detalha os requisitos específicos em cada vaga.'
  },
  {
    q: 'Quanto tempo eu preciso me dedicar no meu voluntariado?',
    a: 'O tempo de dedicação varia de acordo com cada projeto. Algumas ações são pontuais (um único dia), enquanto outras pedem comprometimento semanal. Você encontra essa informação em cada vaga disponível.'
  },
  {
    q: 'O voluntariado é 100% gratuito?',
    a: 'Sim! Participar como voluntário pelo Próximo Amor é totalmente gratuito. Você oferece seu tempo e talento, sem nenhum custo.'
  },
  {
    q: 'Como sei se a organização é confiável?',
    a: 'Todas as ONGs e organizações cadastradas na plataforma passam por um processo de verificação. Você pode ver o status de verificação no perfil de cada organização.'
  },
  {
    q: 'Existe ações voluntárias de forma remota?',
    a: 'Sim! Muitas ações podem ser realizadas remotamente, como mentoria online, criação de conteúdo, tradução e suporte técnico. Você pode filtrar por modalidade remota na busca de vagas.'
  },
  {
    q: 'Vou receber algum certificado pela ação?',
    a: 'Isso depende de cada organização. Algumas emitem certificados de voluntariado ao final das atividades. Verifique os detalhes de cada vaga ou entre em contato com a organização.'
  },
  {
    q: 'Existe idade mínima?',
    a: 'A maioria das vagas é para maiores de 18 anos. Porém, algumas ações aceitam adolescentes a partir de 16 anos com autorização dos responsáveis. Cada vaga especifica os requisitos de idade.'
  }
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  return (
    <div className="faq-page">
      <div className="faq-leaves faq-leaves-left" aria-hidden="true" />
      <div className="faq-leaves faq-leaves-right" aria-hidden="true" />

      <div className="faq-container">
        <h1 className="faq-title">Perguntas Frequentes</h1>
        <p className="faq-subtitle">Tudo o que você precisa saber para começar sua jornada como voluntário hoje mesmo.</p>

        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? 'faq-item-open' : ''}`}
            >
              <button
                id={`faq-btn-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
                className="faq-question"
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                {open === i
                  ? <ChevronUp size={22} className="faq-chevron" />
                  : <ChevronDown size={22} className="faq-chevron" />
                }
              </button>
              {open === i && (
                <div className="faq-answer">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
