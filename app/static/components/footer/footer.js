function initDentamaFooter(root = document.querySelector('[data-footer]')) {
  if (!root) return;
  const year = root.querySelector('[data-footer-year]');
  if (year) year.textContent = new Date().getFullYear();
}

window.initDentamaFooter = initDentamaFooter;
