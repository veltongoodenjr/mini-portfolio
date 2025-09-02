(function () {
  const btn = document.getElementById('mobileMenuButton');
  const menu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  if (!btn || !menu) return;

  const open = () => {
    menu.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    btn.setAttribute('aria-expanded','true');
    closeBtn && closeBtn.focus();
  };
  const close = () => {
    menu.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    btn.setAttribute('aria-expanded','false');
    btn.focus();
  };

  btn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  // close when any link inside menu is tapped
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.classList.contains('hidden')) close(); });
})();
