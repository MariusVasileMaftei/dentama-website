/* ==========================================================================
   DENTAMA V3 - MODULAR CORE APP CONTROLLER
   ========================================================================== */

import { initMenu } from '../modules/menu/menu.js';
import { initFooter } from '../modules/footer/footer.js';
import { initGDPR } from '../modules/gdpr/gdpr.js';

document.addEventListener('DOMContentLoaded', () => {
  const activePage = document.body.getAttribute('data-page') || 'index';

  // Initialize common modules
  initMenu(activePage);
  initFooter();
  initGDPR();

  // Page-specific initialization
  switch (activePage) {
    case 'index':
      import('../modules/pages/home/home.js').then(m => m.initHome && m.initHome());
      break;
    case 'servicii':
      import('../modules/pages/servicii/servicii.js').then(m => m.initServicii && m.initServicii());
      break;
    case 'echipa':
      import('../modules/pages/echipa/echipa.js').then(m => m.initEchipa && m.initEchipa());
      break;
    case 'tarife':
      import('../modules/pages/tarife/tarife.js').then(m => m.initTarife && m.initTarife());
      break;
    case 'cazuri':
      import('../modules/pages/cazuri/cazuri.js').then(m => m.initCazuri && m.initCazuri());
      break;
    case 'caz-detaliu':
      import('../modules/pages/caz-detaliu/caz-detaliu.js').then(m => m.initCazDetaliu && m.initCazDetaliu());
      break;
    case 'despre':
      import('../modules/pages/despre/despre.js').then(m => m.initDespre && m.initDespre());
      break;
    case 'contact':
      import('../modules/pages/contact/contact.js').then(m => m.initContact && m.initContact());
      break;
    case 'programare':
      import('../modules/pages/programare/programare.js').then(m => m.initProgramare && m.initProgramare());
      break;
    case 'admin':
      import('../modules/pages/admin/admin.js').then(m => m.initAdmin && m.initAdmin());
      break;
  }
});
