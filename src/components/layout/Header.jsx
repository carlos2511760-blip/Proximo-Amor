import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.enraizar'), path: '/' },
    { name: t('nav.about'), path: '/sobre' },
    { name: t('nav.faq'), path: '/faq' },
    { name: t('nav.quero_voluntario'), path: '/vagas' },
    { name: t('nav.quero_vagas'), path: '/cadastro/ong' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Heart size={24} fill="currentColor" />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-navy' : 'text-navy'}`}>
            Próximo Amor
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[0.95rem] font-semibold no-underline transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-navy'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <Globe size={20} className="text-navy" />
              <span className="uppercase text-xs font-bold text-navy">{language.split('-')[0]}</span>
            </button>
            
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <button onClick={() => { setLanguage('pt-br'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">Português</button>
                <button onClick={() => { setLanguage('en'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">English</button>
                <button onClick={() => { setLanguage('es'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">Español</button>
              </div>
            )}
          </div>

          <Link to="/login" className="btn btn-secondary border-none bg-transparent hover:bg-slate-100 py-2">
            {t('nav.login')}
          </Link>
          <Link to="/doar" className="btn btn-primary py-2 px-6">
            {t('nav.doe_agora')}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-navy"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t animate-in slide-in-from-top duration-300">
          <div className="container py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-bold text-navy no-underline flex items-center justify-between"
              >
                {link.name}
                <ChevronDown className="-rotate-90 text-slate-300" size={20} />
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" className="btn btn-secondary w-full">Login</Link>
              <Link to="/doar" className="btn btn-primary w-full">Doe agora</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
