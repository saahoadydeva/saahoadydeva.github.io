// ---- CUSTOM CURSOR ----
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
if (ring) animateRing();

// Cursor hover effect on interactive elements
document.querySelectorAll('a, button, .card, .gallery-item, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => ring && ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring && ring.classList.remove('hovered'));
});

// ---- HAMBURGER NAV ----
const hamburger = document.querySelector('.nav-hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const bars = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars[0].style.transform = '';
      bars[1].style.opacity = '';
      bars[2].style.transform = '';
    }
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// ---- ACTIVE NAV LINK ----
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPath || (currentPath === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

// ---- FADE IN ON SCROLL ----
const faders = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
faders.forEach(el => observer.observe(el));

// ---- SKILL BARS ----
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const pct = bar.getAttribute('data-pct') || '80';
      bar.style.width = pct + '%';
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
skillBars.forEach(bar => skillObserver.observe(bar));

// ---- PAGE TRANSITION ----
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const overlay = document.querySelector('.page-transition-overlay');
    if (overlay) {
      overlay.style.transformOrigin = 'bottom';
      overlay.style.transform = 'scaleY(1)';
      setTimeout(() => { window.location.href = href; }, 300);
    } else {
      window.location.href = href;
    }
  });
});

// ---- GLITCH TEXT ----
document.querySelectorAll('.glitch-text').forEach(el => {
  el.setAttribute('data-text', el.textContent);
});

// ---- TYPING EFFECT ----
function typeText(el, text, speed = 60) {
  el.textContent = '';
  let i = 0;
  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}
const typingEls = document.querySelectorAll('[data-type]');
typingEls.forEach(el => {
  const text = el.getAttribute('data-type');
  const delay = parseInt(el.getAttribute('data-type-delay') || 0);
  setTimeout(() => typeText(el, text), delay);
});

// ---- FORM SUBMISSION ----
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name')?.value.trim();
    const email = contactForm.querySelector('#email')?.value.trim();
    const subjectInput = contactForm.querySelector('#subject')?.value.trim();
    const type = contactForm.querySelector('#type')?.value.trim();
    const message = contactForm.querySelector('#message')?.value.trim();
    const btn = contactForm.querySelector('button[type="submit"]');

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message before submitting.');
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending message...';
      btn.style.color = 'var(--neon-green)';
      btn.style.borderColor = 'var(--neon-green)';
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          subject: subjectInput,
          type,
          message,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Unable to send your message.');
      }

      alert('Your message was sent successfully.');
      contactForm.reset();
    } catch (error) {
      alert(error.message || 'Failed to send message. Please try again later.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = '// Transmit';
        btn.style.color = '';
        btn.style.borderColor = '';
      }
    }
  });
}

// ---- NAV SCROLL HIDE ----
let lastScroll = 0;
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  const s = window.scrollY;
  if (nav) {
    if (s > lastScroll && s > 100) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    nav.style.transition = 'transform 0.3s ease';
  }
  lastScroll = s;
});
