import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Github, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-navy text-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <Heart size={24} fill="currentColor" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">
                Próximo Amor
              </span>
            </Link>
            <p className="text-text-light text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-white"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-white"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-white"><Linkedin size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary transition-all text-white"><Github size={20} /></a>
            </div>
          </div>

          {/* Map Links */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">{t('footer.nav')}</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-text-light no-underline hover:text-white transition-all text-sm">{t('nav.enraizar')}</Link>
              <Link to="/sobre" className="text-text-light no-underline hover:text-white transition-all text-sm">{t('nav.about')}</Link>
              <Link to="/faq" className="text-text-light no-underline hover:text-white transition-all text-sm">{t('nav.faq')}</Link>
              <Link to="/vagas" className="text-text-light no-underline hover:text-white transition-all text-sm">{t('nav.quero_voluntario')}</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">{t('footer.legal')}</h4>
            <div className="flex flex-col gap-3">
              <Link to="/termos" className="text-text-light no-underline hover:text-white transition-all text-sm">{t('footer.terms')}</Link>
              <Link to="/privacidade" className="text-text-light no-underline hover:text-white transition-all text-sm">{t('footer.privacy')}</Link>
              <Link to="/cookies" className="text-text-light no-underline hover:text-white transition-all text-sm">{t('footer.cookies')}</Link>
            </div>
          </div>

          {/* Partners */}
          <div className="flex flex-col gap-6">
            <h4 className="text-lg font-bold">{t('footer.partners')}</h4>
            <div className="flex items-center gap-4 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer bg-white/5 p-4 rounded-xl">
              <div className="text-xs font-bold text-center">FUNDAÇÃO<br/>FECAP</div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-text-light text-xs">
          <p>{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
