function initMenu(root = document.querySelector('[data-menu]')) {
  if (!root) return;

  const toggle = root.querySelector('.menu-toggle');
  const navigation = root.querySelector('.main-nav');
  const dropdown = root.querySelector('.main-nav__item--dropdown');
  const serviceLink = dropdown.querySelector(':scope > .main-nav__link');
  const submenuToggle = root.querySelector('.submenu-toggle');
  const otherMenuItems = root.querySelectorAll('.main-nav__list > li:not(.main-nav__item--dropdown)');
  const mobileBreakpoint = window.matchMedia('(max-width: 1180px)');

  const closeDropdown = () => {
    dropdown.classList.remove('is-open');
    submenuToggle.setAttribute('aria-expanded', 'false');
    if (dropdown.contains(document.activeElement)) document.activeElement.blur();
  };

  const closeMenu = () => {
    toggle.classList.remove('is-open');
    navigation.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Deschide meniul');
    document.body.classList.remove('menu-open');
  };

  toggle.addEventListener('click', () => {
    const opening = !navigation.classList.contains('is-open');
    toggle.classList.toggle('is-open', opening);
    navigation.classList.toggle('is-open', opening);
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Închide meniul' : 'Deschide meniul');
    document.body.classList.toggle('menu-open', opening);
  });

  const toggleDropdown = () => {
    const opening = !dropdown.classList.contains('is-open');
    dropdown.classList.toggle('is-open', opening);
    submenuToggle.setAttribute('aria-expanded', String(opening));
    submenuToggle.setAttribute('aria-label', opening ? 'Închide submeniul Servicii' : 'Deschide submeniul Servicii');
  };

  submenuToggle.addEventListener('click', toggleDropdown);

  serviceLink.addEventListener('click', (event) => {
    if (!mobileBreakpoint.matches) return;
    event.preventDefault();
    toggleDropdown();
  });

  otherMenuItems.forEach((item) => {
    item.addEventListener('pointerenter', closeDropdown);
    item.addEventListener('focusin', closeDropdown);
  });

  root.addEventListener('click', (event) => {
    const clickedLink = event.target.closest('a');
    if (mobileBreakpoint.matches && clickedLink && clickedLink !== serviceLink) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();
      closeMenu();
    }
  });

  mobileBreakpoint.addEventListener('change', closeMenu);
  window.addEventListener('scroll', () => root.classList.toggle('is-scrolled', window.scrollY > 8), { passive: true });
}

window.initDentamaMenu = initMenu;
