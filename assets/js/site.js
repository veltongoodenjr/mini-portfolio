// Mobile menu toggle
(function () {
  const btn = document.getElementById('mobileMenuButton');
  const panel = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileMenuClose');
  const overlay = document.getElementById('mobileMenuOverlay');

  if (!btn || !panel) return;

  const open = () => {
    panel.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    btn.setAttribute('aria-expanded', 'true');
    // focus close for accessibility
    closeBtn && closeBtn.focus();
  };

  const close = () => {
    panel.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    btn.setAttribute('aria-expanded', 'false');
    btn.focus();
  };

  btn.addEventListener('click', open);
  closeBtn && closeBtn.addEventListener('click', close);
  overlay && overlay.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.classList.contains('hidden')) close();
  });
})();
