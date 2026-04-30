import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
<<<<<<< Updated upstream
import { Heart, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
=======
import { Menu, X, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
>>>>>>> Stashed changes
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
<<<<<<< Updated upstream
    { name: t('nav.enraizar'), path: '/vagas' },
    { name: t('nav.about'), path: '/sobre' },
    { name: t('nav.faq'), path: '/faq' },
    { name: t('nav.quero_voluntario'), path: '/cadastro/voluntario' },
    { name: t('nav.quero_vagas'), path: '/cadastro/ong' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3 shadow-md' : 'py-5'}`}
      style={{ backgroundColor: '#2ACDBE' }}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-12 h-12 flex items-center justify-center transition-transform hover:scale-110">
            <img src="icons/logoSymChroma.png" alt="Proximo Amor Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-navy">
=======
    { name: 'Enraizar', path: '/vagas' },
    { name: 'Quem somos', path: '/quem-somos' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Quero ser voluntário!', path: '/cadastro/voluntario' },
    { name: 'Quero encontrar voluntários!', path: '/captar' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#2ACDBE] py-3 shadow-md' : 'bg-[#2ACDBE] py-5'}`}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline">
          <div className="w-10 h-10 flex items-center justify-center">
            <img src="icons/logoSymChroma.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
>>>>>>> Stashed changes
            Próximo Amor
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
<<<<<<< Updated upstream
              className={`text-[0.95rem] font-bold no-underline transition-colors hover:text-white ${
                location.pathname === link.path ? 'text-white underline underline-offset-8 decoration-2' : 'text-navy'
=======
              className={`text-[0.95rem] font-semibold no-underline transition-colors hover:text-white/80 ${
                location.pathname === link.path ? 'text-white' : 'text-white'
>>>>>>> Stashed changes
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
<<<<<<< Updated upstream
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <Globe size={20} className="text-navy" />
              <span className="uppercase text-xs font-bold text-navy">{language.split('-')[0]}</span>
            </button>
            
            {langMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden py-2">
                <button onClick={() => { setLanguage('pt-br'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">Português</button>
                <button onClick={() => { setLanguage('en'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">English</button>
                <button onClick={() => { setLanguage('es'); setLangMenuOpen(false); }} className="w-full text-left px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors">Español</button>
              </div>
            )}
          </div>

          <Link to="/login" className="btn btn-secondary border-navy text-navy hover:bg-navy hover:text-white py-2">
            {t('nav.login')}
          </Link>
          <Link to="/doar" className="btn bg-navy text-white hover:bg-navy/80 py-2 px-6 rounded-full font-bold transition-all shadow-lg">
            {t('nav.doe_agora')}
=======
          <Link to="/login" className="btn btn-secondary border-none bg-transparent hover:bg-white/10 py-2 text-white">
            Login
          </Link>
          <Link to="/doar" className="btn btn-primary py-2 px-6 bg-white text-[#2ACDBE] hover:bg-slate-50">
            Doe agora
>>>>>>> Stashed changes
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
<<<<<<< Updated upstream
          className="lg:hidden p-2 text-navy"
=======
          className="lg:hidden p-2 text-white"
>>>>>>> Stashed changes
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
<<<<<<< Updated upstream
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl border-t animate-in slide-in-from-top duration-300">
=======
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#2ACDBE] shadow-2xl border-t border-white/10 animate-in slide-in-from-top duration-300">
>>>>>>> Stashed changes
          <div className="container py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
<<<<<<< Updated upstream
                className="text-lg font-bold text-navy no-underline flex items-center justify-between"
              >
                {link.name}
                <ChevronDown className="-rotate-90 text-slate-300" size={20} />
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" className="btn btn-secondary w-full">Login</Link>
              <Link to="/doar" className="btn btn-primary w-full">Doe agora</Link>
=======
                className="text-lg font-bold text-white no-underline flex items-center justify-between"
              >
                {link.name}
                <ChevronDown className="-rotate-90 text-white/50" size={20} />
              </Link>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <Link to="/login" className="btn btn-secondary w-full text-white border-white/20">Login</Link>
              <Link to="/doar" className="btn btn-primary w-full bg-white text-[#2ACDBE]">Doe agora</Link>
>>>>>>> Stashed changes
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
