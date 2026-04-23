/**
 * CertiLens Pro — Website Script
 * Handles: scroll nav, scroll animations, copy buttons, mobile menu
 */

'use strict';

// ── Nav scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile menu ──
const menuBtn  = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = menuBtn.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');
  spans[0].style.transform = isOpen ? 'translateY(6px) rotate(45deg)' : '';
  spans[1].style.opacity   = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'translateY(-6px) rotate(-45deg)' : '';
});

// Close mobile menu when a link is clicked
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = menuBtn.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  });
});

// ── Scroll-triggered animations ──
const animTargets = document.querySelectorAll(
  '.flow-step, .engine-card, .install-step'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px',
});

animTargets.forEach(el => observer.observe(el));

// ── Copy buttons ──
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      btn.classList.add('copied');
      // Swap icon to checkmark briefly
      const originalHTML = btn.innerHTML;
      btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polyline points="20 6 9 17 4 12"/>
      </svg>`;
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('copied');
      }, 1800);
    } catch {
      // Clipboard API not available — silent fail
    }
  });
});

// ── Smooth scroll for nav anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 70; // nav height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Popup mockup: stagger engine card entrance ──
const pmEngines = document.querySelectorAll('.pm-engine');
pmEngines.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  el.style.transition = `opacity 0.3s ${0.8 + i * 0.07}s ease, transform 0.3s ${0.8 + i * 0.07}s ease`;
  setTimeout(() => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 800 + i * 70);
});

const pmFindings = document.querySelectorAll('.pm-finding');
pmFindings.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transition = `opacity 0.3s ${1.2 + i * 0.1}s ease`;
  setTimeout(() => { el.style.opacity = '1'; }, 1200 + i * 100);
});
