import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt-br');

  const t = (key) => {
    const dicts = {
      'pt-br': {
        'nav.home': 'Início', 'nav.about': 'Sobre Nós', 'nav.login': 'Entrar', 'nav.register': 'Criar Conta',
        'nav.enraizar': 'Enraizar', 'nav.faq': 'FAQ', 'nav.quero_voluntario': 'Quero ser voluntário!', 'nav.quero_vagas': 'Quero encontrar voluntários!', 'nav.doe_agora': 'Doe agora',
        'footer.tagline': 'Conectando corações ao voluntariado. Somos uma iniciativa dedicada a transformar vidas e fortalecer comunidades através da solidariedade.',
        'footer.nav': 'Navegação', 'footer.legal': 'Legal', 'footer.partners': 'Parceiros',
        'footer.terms': 'Termos de Uso', 'footer.privacy': 'Política de Privacidade', 'footer.cookies': 'Política de Cookies',
        'footer.rights': '© 2026 Próximo Amor. Todos os direitos reservados. Feito com amor por Flavio e Guilherme.',
        'search_title': 'Somos uma iniciativa dedicada a transformar vidas por meio do voluntariado.',
        'search_subtitle': 'Faça parte desse amor hoje!',
        'search_placeholder': 'Busque por folhas, galhos, etc...',
        'search_causes': 'Causas',
        'search_areas': 'Áreas',
        'jobs_title': 'Raízes da semana',
        'jobs_subtitle': 'Veja as oportunidades selecionadas pelo Próximo Amor para esta semana!',
        'jobs_view_all': 'Ver todas',
        'home.heroTitle': 'Conectando Corações ao Voluntariado',
        'home.heroSub': 'A maior plataforma do Brasil unindo ONGs com pessoas apaixonadas.',
        'home.heroBtn': 'Quero Fazer a Diferença',
        'home.howItWorks': 'Como Funciona?',
        'home.step1Title': 'Crie seu Perfil', 'home.step1Desc': 'Mostre suas habilidades ou busque ajuda especializada.',
        'home.step2Title': 'Encontre Causas', 'home.step2Desc': 'Explore vagas com base na sua localização e interesses.',
        'home.step3Title': 'Faça o Bem', 'home.step3Desc': 'Transforme a vida de milhares de pessoas.',
        'about.title': 'Sobre o Próximo Amor',
        'about.description': 'Somos uma iniciativa privada com o objetivo de conectar pessoas...',
        'auth.loginTitle': 'Acesse sua conta', 'auth.loginSub': 'Bem-vindo de volta ao Próximo Amor!',
        'auth.email': 'E-mail', 'auth.password': 'Senha', 'auth.remember': 'Lembrar-me', 'auth.forgot': 'Esqueci a senha',
        'auth.enter': 'Entrar', 'auth.loading': 'Carregando...', 'auth.noAccount': 'Não tem uma conta?', 'auth.signup': 'Cadastre-se',
        'auth.alreadyAccount': 'Já tem uma conta?', 'auth.loginLink': 'Faça Login',
        'reg.title': 'Como você quer fazer a diferença?', 'reg.sub': 'Escolha o seu perfil para entrarmos juntos nessa jornada.',
        'reg.volTitle': 'Sou Voluntário', 'reg.volDesc': 'Quero dedicar meu tempo e talento para causas sociais.',
        'reg.ongTitle': 'Sou uma ONG', 'reg.ongDesc': 'Preciso de voluntários engajados para nossos projetos.',
        'auth.regVolTitle': 'Cadastro de Voluntário', 'auth.regVolSub': 'Faça parte da maior rede de solidariedade.',
        'auth.fullName': 'Nome Completo', 'auth.skills': 'Habilidades', 'auth.skillsPlaceholder': 'Ex: Design, Programação, Música',
        'auth.confirmPass': 'Confirme sua Senha', 'auth.finishReg': 'Criar Conta',
        'auth.regOngTitle': 'Cadastro de ONG', 'auth.regOngSub': 'Encontre voluntários engajados para sua causa.',
        'auth.ongName': 'Nome da Organização', 'auth.cnpj': 'CNPJ', 'auth.corpEmail': 'E-mail Institucional',
        'auth.mainCause': 'Causa Principal', 'auth.selectCause': 'Selecione uma causa',
        'cause.edu': 'Educação', 'cause.env': 'Meio Ambiente', 'cause.health': 'Saúde', 'cause.social': 'Assistência Social', 'cause.animals': 'Proteção Animal',
      },
      'en': {
        'nav.home': 'Home', 'nav.about': 'About Us', 'nav.login': 'Login', 'nav.register': 'Sign Up',
        'home.heroTitle': 'Connecting Hearts to Volunteering',
        'home.heroSub': 'The largest platform in Brazil joining NGOs with passionate volunteers.',
        'home.heroBtn': 'Make a Difference',
        'home.howItWorks': 'How it Works?',
        'home.step1Title': 'Create Profile', 'home.step1Desc': 'Show your skills or seek specialized help.',
        'home.step2Title': 'Find Causes', 'home.step2Desc': 'Explore roles based on location and interests.',
        'home.step3Title': 'Do Good', 'home.step3Desc': 'Transform the lives of thousands of people.',
        'about.title': 'About Próximo Amor',
        'about.description': 'We are a private initiative with the goal of connecting people...',
        'auth.loginTitle': 'Sign in to account', 'auth.loginSub': 'Welcome back to Próximo Amor!',
        'auth.email': 'Email', 'auth.password': 'Password', 'auth.remember': 'Remember me', 'auth.forgot': 'Forgot password',
        'auth.enter': 'Sign In', 'auth.loading': 'Loading...', 'auth.noAccount': "Don't have an account?", 'auth.signup': 'Sign Up',
        'auth.alreadyAccount': 'Already have an account?', 'auth.loginLink': 'Login here',
        'reg.title': 'How do you want to make a difference?', 'reg.sub': 'Choose your profile to join this journey of solidarity.',
        'reg.volTitle': 'I am a Volunteer', 'reg.volDesc': 'I want to dedicate my time and talent to social causes.',
        'reg.ongTitle': 'I am an NGO', 'reg.ongDesc': 'I need engaged volunteers to boost our projects.',
        'auth.regVolTitle': 'Volunteer Registration', 'auth.regVolSub': 'Be part of the largest solidarity network.',
        'auth.fullName': 'Full Name', 'auth.skills': 'Skills', 'auth.skillsPlaceholder': 'Ex: Design, Coding, Music',
        'auth.confirmPass': 'Confirm Password', 'auth.finishReg': 'Create Account',
        'auth.regOngTitle': 'NGO Registration', 'auth.regOngSub': 'Find engaged volunteers for your cause.',
        'auth.ongName': 'Organization Name', 'auth.cnpj': 'Tax ID (CNPJ)', 'auth.corpEmail': 'Institutional Email',
        'auth.mainCause': 'Main Cause', 'auth.selectCause': 'Select a cause',
        'cause.edu': 'Education', 'cause.env': 'Environment', 'cause.health': 'Health', 'cause.social': 'Social Assistance', 'cause.animals': 'Animal Protection',
      },
      'es': {
        'nav.home': 'Inicio', 'nav.about': 'Sobre Nosotros', 'nav.login': 'Entrar', 'nav.register': 'Registrarse',
        'home.heroTitle': 'Conectando Corazones al Voluntariado',
        'home.heroSub': 'La mayor plataforma de Brasil que une a ONGs con voluntarios apasionados.',
        'home.heroBtn': 'Quiero Marcar la Diferencia',
        'home.howItWorks': '¿Cómo Funciona?',
        'home.step1Title': 'Crea tu Perfil', 'home.step1Desc': 'Muestra tus habilidades o busca ayuda especializada.',
        'home.step2Title': 'Busca Causas', 'home.step2Desc': 'Explora vacantes según tu ubicación e intereses.',
        'home.step3Title': 'Haz el Bien', 'home.step3Desc': 'Transforma la vida de miles de personas.',
        'about.title': 'Sobre Próximo Amor',
        'about.description': 'Somos una iniciativa privada con el objetivo de conectar personas...',
        'auth.loginTitle': 'Accede a tu cuenta', 'auth.loginSub': '¡Bienvenido de vuelta a Próximo Amor!',
        'auth.email': 'Email', 'auth.password': 'Contraseña', 'auth.remember': 'Recordarme', 'auth.forgot': 'Olvidé mi contraseña',
        'auth.enter': 'Entrar', 'auth.loading': 'Cargando...', 'auth.noAccount': '¿No tienes cuenta?', 'auth.signup': 'Regístrate',
        'auth.alreadyAccount': '¿Ya tienes una cuenta?', 'auth.loginLink': 'Iniciar sesión',
        'reg.title': '¿Cómo quieres marcar la diferencia?', 'reg.sub': 'Elige tu perfil para unirte a este viaje de solidaridad.',
        'reg.volTitle': 'Soy Voluntario', 'reg.volDesc': 'Quiero dedicar mi tiempo y talento a causas sociales.',
        'reg.ongTitle': 'Soy una ONG', 'reg.ongDesc': 'Necesito voluntarios comprometidos para nuestros proyectos.',
        'auth.regVolTitle': 'Registro de Voluntario', 'auth.regVolSub': 'Forma parte de la mayor red de solidaridad.',
        'auth.fullName': 'Nombre Completo', 'auth.skills': 'Habilidades', 'auth.skillsPlaceholder': 'Ej: Diseño, Programación, Música',
        'auth.confirmPass': 'Confirmar Contraseña', 'auth.finishReg': 'Crear Cuenta',
        'auth.regOngTitle': 'Registro de ONG', 'auth.regOngSub': 'Encuentra voluntarios comprometidos para tu causa.',
        'auth.ongName': 'Nombre de la Organización', 'auth.cnpj': 'CNPJ (RUC)', 'auth.corpEmail': 'Email Institucional',
        'auth.mainCause': 'Causa Principal', 'auth.selectCause': 'Selecciona una causa',
        'cause.edu': 'Educación', 'cause.env': 'Medio Ambiente', 'cause.health': 'Salud', 'cause.social': 'Asistencia Social', 'cause.animals': 'Protección Animal',
      }
    };
    return dicts[language]?.[key] || dicts['pt-br'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
