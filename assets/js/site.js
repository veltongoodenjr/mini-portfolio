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

// ---- Active nav highlighter ----
(function () {
  try {
    const current = new URL(window.location.href);
    // normalize pathname to always end with "/"
    const here = current.pathname.replace(/\/?$/, "/");

    document.querySelectorAll("header.nav .nav-links a[href]").forEach(a => {
      const href = a.getAttribute("href");
      // skip external
      if (!href || /^https?:\/\//i.test(href)) return;

      // normalize link path to end with "/"
      const linkURL = new URL(href, window.location.origin);
      const linkPath = linkURL.pathname.replace(/\/?$/, "/");

      // exact match (e.g., "/services/" matches "/services/")
      if (linkPath === here) {
        a.classList.add("nav-active");
        a.setAttribute("aria-current", "page");
      }
    });
  } catch (e) {
    // no-op
  }
})();