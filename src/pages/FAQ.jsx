import React, { useState } from 'react';
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
    </div>
  );
};

export default FAQ;
