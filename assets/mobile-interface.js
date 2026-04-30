/**
 * Suporte de Interface Mobile Injetável
 * Detecta se o usuário está em um dispositivo móvel e injeta componentes
 * funcionais e acessíveis na interface, sem quebrar o framework existente.
 */

(function () {
  // Constantes
  const MOBILE_BREAKPOINT = 768;

  // SVGs dos ícones para o menu inferior
  const icons = {
    home: `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
    vagas: `<svg viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>`,
    perfil: `<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`,
    menu: `<svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>`,
    close: `<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`
  };

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function initMobileInterface() {
    // 1. Marcar o body
    document.body.classList.add('is-mobile');

    // 2. Criar a Bottom Navigation se não existir
    if (!document.getElementById('mobile-bottom-nav')) {
      const bottomNav = document.createElement('nav');
      bottomNav.id = 'mobile-bottom-nav';
      bottomNav.className = 'mobile-bottom-nav';
      
      bottomNav.innerHTML = `
        <a href="#" class="mobile-nav-item active" onclick="handleMobileNavClick(this, 'home')">
          ${icons.home}
          <span>Início</span>
        </a>
        <a href="#" class="mobile-nav-item" onclick="handleMobileNavClick(this, 'vagas')">
          ${icons.vagas}
          <span>Vagas</span>
        </a>
        <a href="#" class="mobile-nav-item" onclick="handleMobileNavClick(this, 'perfil')">
          ${icons.perfil}
          <span>Perfil</span>
        </a>
        <a href="#" class="mobile-nav-item" onclick="toggleMobileMenu()">
          ${icons.menu}
          <span>Menu</span>
        </a>
      `;
      document.body.appendChild(bottomNav);
    }

    // 3. Criar o Drawer Menu (Sidebar)
    if (!document.getElementById('mobile-overlay-menu')) {
      const overlayMenu = document.createElement('div');
      overlayMenu.id = 'mobile-overlay-menu';
      overlayMenu.className = 'mobile-overlay-menu';
      
      overlayMenu.innerHTML = `
        <div class="mobile-drawer">
          <div class="drawer-header">
            <div class="logo-container" style="font-size:1.25rem; font-weight:bold; color:#0b1c3c;">
              <span style="color:#0066cc;">Próximo</span>Amor
            </div>
            <button class="drawer-close-btn" onclick="toggleMobileMenu()">
              ${icons.close}
            </button>
          </div>
          <div class="drawer-links">
            <a href="#" class="drawer-link" onclick="toggleMobileMenu()">Início</a>
            <a href="#" class="drawer-link" onclick="toggleMobileMenu()">Oportunidades</a>
            <a href="#" class="drawer-link" onclick="toggleMobileMenu()">Como Funciona</a>
            <a href="#" class="drawer-link" onclick="toggleMobileMenu()">Sobre Nós</a>
            <a href="#" class="btn-primary" style="text-align:center; margin-top:1rem;" onclick="toggleMobileMenu()">Entrar</a>
          </div>
        </div>
      `;
      
      // Fechar ao clicar fora do drawer
      overlayMenu.addEventListener('click', function(e) {
        if (e.target === overlayMenu) {
          toggleMobileMenu();
        }
      });
      
      document.body.appendChild(overlayMenu);
    }
  }

  function destroyMobileInterface() {
    document.body.classList.remove('is-mobile');
  }

  // Funções Globais expostas para os eventos onclick (injetados em HTML string)
  window.handleMobileNavClick = function(element, route) {
    // Atualizar UI da bottom nav
    document.querySelectorAll('.mobile-nav-item').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
    
    // Como é um SPA, aqui simularíamos a navegação clicando nos botões originais ou mudando hash
    // Neste caso, se for só demonstração visual, basta atualizar a classe active.
  };

  window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-overlay-menu');
    if (menu) {
      menu.classList.toggle('open');
      if (menu.classList.contains('open')) {
        document.body.style.overflow = 'hidden'; // Evita scroll atrás do menu
      } else {
        document.body.style.overflow = '';
      }
    }
  };

  // Observar mudanças no tamanho da janela
  window.addEventListener('resize', () => {
    if (isMobile()) {
      initMobileInterface();
    } else {
      destroyMobileInterface();
    }
  });

  // Inicializar se o DOM já estiver pronto, caso contrário esperar o carregamento
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Como o React carrega o DOM assincronamente, adicionamos um pequeno atraso
      // para garantir que a interface móvel seja adicionada corretamente após a renderização do app
      setTimeout(() => {
        if (isMobile()) initMobileInterface();
      }, 500);
    });
  } else {
    setTimeout(() => {
      if (isMobile()) initMobileInterface();
    }, 500);
  }
})();
