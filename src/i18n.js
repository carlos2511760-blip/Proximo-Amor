import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  pt: {
    translation: {
      "welcome": "Bem-vindo ao Próximo Amor",
      "mission": "Conectando corações e talentos para um mundo melhor.",
      "hero_title": "O seu próximo gesto de amor começa aqui.",
      "hero_subtitle": "Encontre ONGs que precisam do seu talento ou poste vagas para encontrar os voluntários ideais.",
      "cta_volunteer": "Quero ser Voluntário",
      "cta_ong": "Sou uma ONG",
      "nav_home": "Início",
      "nav_jobs": "Vagas",
      "nav_login": "Entrar",
      "footer_text": "© 2024 Próximo Amor. Impactando vidas juntos.",
      "features": "Funcionalidades",
      "features_sub": "Tudo o que você precisa para gerenciar e encontrar oportunidades de impacto social.",
      "feature_profile_title": "Perfil de Competências",
      "feature_profile_desc": "Liste suas habilidades e deixe as ONGs encontrarem você.",
      "feature_jobs_title": "Busca Inteligente",
      "feature_jobs_desc": "Filtre por categoria, localização e tempo de dedicação.",
      "feature_ong_title": "Gestão de Vagas",
      "feature_ong_desc": "Crie e gerencie oportunidades com facilidade."
    }
  },
  en: {
    translation: {
      "welcome": "Welcome to Next Love",
      "mission": "Connecting hearts and talents for a better world.",
      "hero_title": "Your next act of love starts here.",
      "hero_subtitle": "Find NGOs that need your talent or post jobs to find the ideal volunteers.",
      "cta_volunteer": "I want to Volunteer",
      "cta_ong": "I am an NGO",
      "nav_home": "Home",
      "nav_jobs": "Jobs",
      "nav_login": "Login",
      "footer_text": "© 2024 Next Love. Impacting lives together.",
      "features": "Features",
      "features_sub": "Everything you need to manage and find social impact opportunities.",
      "feature_profile_title": "Skill Profile",
      "feature_profile_desc": "List your skills and let NGOs find you.",
      "feature_jobs_title": "Smart Search",
      "feature_jobs_desc": "Filter by category, location, and dedication time.",
      "feature_ong_title": "Job Management",
      "feature_ong_desc": "Create and manage opportunities with ease."
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido a Próximo Amor",
      "mission": "Conectando corazones y talentos para un mundo mejor.",
      "hero_title": "Tu próximo gesto de amor comienza aquí.",
      "hero_subtitle": "Encuentra ONGs que necesiten tu talento o publica vacantes para encontrar los voluntarios ideales.",
      "cta_volunteer": "Quiero ser Voluntario",
      "cta_ong": "Soy una ONG",
      "nav_home": "Inicio",
      "nav_jobs": "Vacantes",
      "nav_login": "Entrar",
      "footer_text": "© 2024 Próximo Amor. Impactando vidas juntos.",
      "features": "Funcionalidades",
      "features_sub": "Todo lo que necesitas para gestionar y encontrar oportunidades de impacto social.",
      "feature_profile_title": "Perfil de Competencias",
      "feature_profile_desc": "Lista tus habilidades y deja que las ONGs te encuentren.",
      "feature_jobs_title": "Búsqueda Inteligente",
      "feature_jobs_desc": "Filtra por categoría, ubicación y tiempo de dedicación.",
      "feature_ong_title": "Gestión de Vacantes",
      "feature_ong_desc": "Crea y gestiona oportunidades con facilidad."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
