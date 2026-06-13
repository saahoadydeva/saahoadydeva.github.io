// ---- PAGE TRANSITIONS ----
(function () {
  const overlay = document.querySelector('.page-transition-overlay');
  if (!overlay) return;

  // On load — drop overlay
  window.addEventListener('load', () => {
    overlay.style.transformOrigin = 'top';
    overlay.style.transition = 'transform 0.4s cubic-bezier(0.4,0,0.2,1)';
    overlay.style.transform = 'scaleY(0)';
  });
})();
