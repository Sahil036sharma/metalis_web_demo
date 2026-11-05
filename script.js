const header = document.querySelector('.site-header');
const megaTrigger = document.querySelector('.mega-trigger');
const megaMenu = document.querySelector('.mega-menu');
const mobileMenu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const toast = document.querySelector('.toast');
let toastTimer;

window.addEventListener('load', () => window.setTimeout(() => document.querySelector('.page-loader').classList.add('is-done'), 450));
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 50), { passive: true });

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.13 });
document.querySelectorAll('.reveal').forEach((element, index) => {
  if (element.matches('.product-card,.journal-card,.project-card')) element.style.setProperty('--delay', `${(index % 4) * 70}ms`);
  revealObserver.observe(element);
});

function closeMegaMenu() {
  megaMenu.classList.remove('is-open');
  megaMenu.setAttribute('aria-hidden', 'true');
  megaTrigger.setAttribute('aria-expanded', 'false');
}
megaTrigger.addEventListener('click', () => {
  const isOpen = megaTrigger.getAttribute('aria-expanded') === 'true';
  megaTrigger.setAttribute('aria-expanded', String(!isOpen));
  megaMenu.setAttribute('aria-hidden', String(isOpen));
  megaMenu.classList.toggle('is-open', !isOpen);
});
document.addEventListener('click', (event) => { if (!event.target.closest('.site-header')) closeMegaMenu(); });

function closeMobileMenu() {
  mobileMenu.classList.remove('is-open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  menuToggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('locked');
}
menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileMenu.setAttribute('aria-hidden', String(isOpen));
  mobileMenu.classList.toggle('is-open', !isOpen);
  document.body.classList.toggle('locked', !isOpen);
});
document.querySelector('.mobile-close').addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('a:not(.mobile-product-list a)').forEach((link) => link.addEventListener('click', closeMobileMenu));
document.querySelector('.mobile-products-trigger').addEventListener('click', (event) => {
  const list = document.querySelector('.mobile-product-list');
  const open = list.classList.toggle('is-open');
  event.currentTarget.querySelector('span').textContent = open ? '−' : '+';
});

document.querySelectorAll('.mega-grid a').forEach((link) => link.addEventListener('click', closeMegaMenu));
const productContent = {
  'Aluminium Windows': ['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=85', 'Light, framed with intention.'],
  'Aluminium Doors': ['https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=85', 'A beautifully resolved connection between spaces.'],
  'Curtain Wall Systems': ['https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1100&q=85', 'A considered envelope for ambitious architecture.'],
  'ACP & Metal Cladding': ['https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1100&q=85', 'Give the outside a character all its own.'],
  'Glass Partitions': ['https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=85', 'Keep the light. Create a little definition.'],
  'Custom Metal Fabrication': ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1100&q=85', 'For the details that do not come off the shelf.'],
};
const productModal = document.querySelector('.product-modal');
function openProduct(name) {
  const [image, description] = productContent[name] || productContent['Aluminium Windows'];
  productModal.querySelector('h2').textContent = name;
  productModal.querySelector('.product-modal-image img').src = image;
  productModal.querySelector('.product-modal-image img').alt = name;
  productModal.querySelector('.product-modal-copy > p').textContent = description;
  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
}
function closeProduct() {
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
}
document.querySelectorAll('[data-detail]').forEach((card) => card.addEventListener('click', () => openProduct(card.dataset.detail)));
document.querySelectorAll('.mega-grid a').forEach((link) => link.addEventListener('click', () => openProduct(link.dataset.product)));
document.querySelector('.product-modal-close').addEventListener('click', closeProduct);
document.querySelector('.modal-enquire').addEventListener('click', closeProduct);
productModal.addEventListener('click', (event) => { if (event.target === productModal) closeProduct(); });

document.querySelectorAll('.filter-chip').forEach((chip) => chip.addEventListener('click', () => {
  document.querySelector('.filter-chip.active').classList.remove('active');
  chip.classList.add('active');
  document.querySelectorAll('.project-card').forEach((card) => {
    const show = chip.dataset.filter === 'all' || card.dataset.category === chip.dataset.filter;
    card.classList.toggle('is-hidden', !show);
  });
}));

const lightbox = document.querySelector('.lightbox');
document.querySelectorAll('[data-lightbox]').forEach((button) => button.addEventListener('click', () => {
  lightbox.querySelector('img').src = button.dataset.lightbox;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('locked');
}));
function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('locked');
}
lightbox.querySelector('button').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });

const searchPanel = document.querySelector('.search-panel');
document.querySelector('.search-trigger').addEventListener('click', () => {
  searchPanel.classList.add('is-open');
  searchPanel.setAttribute('aria-hidden', 'false');
  window.setTimeout(() => document.querySelector('#site-search').focus(), 150);
});
function closeSearch() {
  searchPanel.classList.remove('is-open');
  searchPanel.setAttribute('aria-hidden', 'true');
}
document.querySelector('.search-close').addEventListener('click', closeSearch);
document.querySelector('#site-search').addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll('.search-results a').forEach((link) => link.classList.toggle('is-hidden', query && !`${link.textContent} ${link.getAttribute('href')}`.toLowerCase().includes(query)));
});
document.querySelectorAll('.search-results a').forEach((link) => link.addEventListener('click', closeSearch));
searchPanel.addEventListener('click', (event) => { if (event.target === searchPanel) closeSearch(); });

 document.querySelectorAll('.stat strong').forEach((counter) => {
  const countObserver = new IntersectionObserver((entries, observer) => {
    if (!entries[0].isIntersecting) return;
    const target = Number(counter.dataset.count);
    const started = performance.now();
    const duration = 1500;
    function tick(now) {
      const progress = Math.min((now - started) / duration, 1);
      counter.textContent = Math.floor(target * (1 - (1 - progress) ** 3)).toLocaleString();
      if (progress < 1) requestAnimationFrame(tick);
      else if (target === 640) counter.textContent = '640+';
      else if (target === 12) counter.textContent = '12';
    }
    requestAnimationFrame(tick);
    observer.disconnect();
  }, { threshold: .6 });
  countObserver.observe(counter);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3800);
}
document.querySelector('#enquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  showToast('Thank you. Your enquiry is ready for our team.');
  event.currentTarget.reset();
  document.querySelector('#file-names').textContent = 'PDF, DWG, JPG or PNG · up to 20 MB';
});
document.querySelector('#project-files').addEventListener('change', (event) => {
  const names = Array.from(event.target.files, (file) => file.name);
  document.querySelector('#file-names').textContent = names.length ? names.join(', ') : 'PDF, DWG, JPG or PNG · up to 20 MB';
});
document.querySelector('#catalogue-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const catalogue = `<!doctype html><html><head><meta charset="utf-8"><title>METALIS Architectural Systems Catalogue</title><style>body{font:16px Arial,sans-serif;max-width:750px;margin:80px auto;color:#222;line-height:1.7;padding:24px}h1{font-size:48px;font-weight:500}h2{font-size:24px;margin-top:48px}small{color:#9a7b42;letter-spacing:2px}hr{border:0;border-top:1px solid #c3a15b;margin:28px 0}</style></head><body><small>METALIS / ARCHITECTURAL SYSTEMS / 2026</small><h1>Engineered to define spaces.</h1><p>A considered guide to architectural metal systems, made with precision and built to last.</p><hr><h2>Our systems</h2><p>Aluminium Windows · Aluminium Doors · Curtain Wall Systems · ACP & Metal Cladding · Glass Partitions · Custom Metal Fabrication</p><h2>From brief to build</h2><p>Design partnership, material expertise, precision manufacturing and installation support, brought together around your project.</p><hr><p>Start a conversation: hello@metalis.studio · +91 22 4000 1998</p><p>METALIS — Engineered to define spaces.</p></body></html>`;
  const blob = new Blob([catalogue], { type: 'text/html' });
  const download = document.createElement('a');
  download.href = URL.createObjectURL(blob);
  download.download = 'METALIS-architectural-systems-catalogue.html';
  download.click();
  URL.revokeObjectURL(download.href);
  event.currentTarget.reset();
  showToast('Your METALIS catalogue has been downloaded.');
});
document.querySelector('#newsletter-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  showToast('You are on the list. Speak soon.');
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeMegaMenu();
  closeMobileMenu();
  closeProduct();
  closeLightbox();
  closeSearch();
});
