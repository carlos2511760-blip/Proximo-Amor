import React, { useState } from 'react';
<<<<<<< Updated upstream
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
=======
import { ChevronDown, MessageCircle, Info, ShieldCheck, Award } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      q: "O voluntariado é gratuito?", 
      a: "Sim, o voluntariado através do Próximo Amor é totalmente gratuito. Nosso objetivo é facilitar a conexão entre quem quer ajudar e quem precisa de ajuda, sem custos para os voluntários.",
      icon: <Info size={18} />
    },
    { 
      q: "Vou receber certificado pelas horas?", 
      a: "A maioria das ONGs cadastradas oferece certificados ou declarações de horas voluntárias. Você pode verificar essa informação diretamente na descrição de cada 'Raiz' ou conversando com a instituição.",
      icon: <Award size={18} />
    },
    { 
      q: "As organizações são seguras?", 
      a: "Sim, realizamos uma verificação básica de todas as instituições que se cadastram em nossa plataforma para garantir que as oportunidades sejam legítimas e seguras para nossos voluntários.",
      icon: <ShieldCheck size={18} />
    },
    { 
      q: "Como posso ser um captador?", 
      a: "Se você representa uma ONG ou empresa e deseja encontrar voluntários, basta realizar o cadastro como 'Captador' na nossa página de registro.",
      icon: <MessageCircle size={18} />
    }
  ];

  return (
    <div className="min-h-screen bg-bg-main">
      <Header />

      <section className="pt-40 pb-12 bg-white">
        <div className="container text-center">
          <h1 className="text-5xl font-bold text-navy mb-4">Dúvidas Frequentes</h1>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Tudo o que você precisa saber para começar sua jornada como voluntário hoje mesmo.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 overflow-hidden transition-all shadow-sm">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-slate-50 transition-all font-bold text-navy"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-primary">{faq.icon}</span>
                    {faq.q}
                  </span>
                  <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-primary' : 'text-slate-300'}`} size={20} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-8 pb-8 text-text-muted leading-relaxed">
                    <p className="pt-4 border-t border-slate-50">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
>>>>>>> Stashed changes
    </div>
  );
};

export default FAQ;
