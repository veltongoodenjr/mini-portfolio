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

// ===== Smooth scroll for same-page anchors =====
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if (id.length > 1 && document.querySelector(id)) {
      e.preventDefault();
      document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

// ===== Reveal on scroll (sections/cards with .reveal) =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){ en.target.classList.add('in-view'); io.unobserve(en.target); }
  });
},{ rootMargin: '0px 0px -10% 0px', threshold: .15 });
document.querySelectorAll('.reveal').forEach(el=> io.observe(el));

// ===== Button loading states (forms) =====
// Add data-loading on submit buttons: data-loading="Sending…"
document.querySelectorAll('form').forEach(form=>{
  form.addEventListener('submit', ()=>{
    const btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    btn.dataset.originalText = btn.innerHTML;
    const label = btn.getAttribute('data-loading') || 'Sending…';
    btn.classList.add('is-loading');
    btn.innerHTML = `<i class="fa-regular fa-paper-plane"></i> ${label}`;
    // Optionally disable all inputs
    form.querySelectorAll('input, select, textarea, button').forEach(el=> el.disabled = true);
  }, { once:true });
});

// ===== Optional: add skeletons to iframes/images with [data-skel] =====
document.querySelectorAll('[data-skel]').forEach(el=>{
  el.classList.add('skeleton','skel-rect');
  const onLoad = ()=> el.classList.remove('skeleton','skel-rect');
  el.addEventListener('load', onLoad, { once:true });
});

// ===== Nav underline hover (apply class to desktop UL) =====
const navUl = document.querySelector('header nav ul');
if (navUl) navUl.classList.add('nav-anim');
