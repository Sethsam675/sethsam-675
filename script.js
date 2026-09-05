const lightboxLinks = document.querySelectorAll('.lightbox');

lightboxLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const lightbox = document.createElement('div');
    const image = document.createElement('img');
    const closeButton = document.createElement('button');

    lightbox.className = 'lightbox-modal';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || 'Enlarged portfolio image';
    closeButton.className = 'close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close image');
    closeButton.textContent = '×';

    lightbox.append(image, closeButton);
    document.body.appendChild(lightbox);
    closeButton.focus();

    const handleKeydown = event => {
      if (event.key === 'Escape') closeLightbox();
    };

    const closeLightbox = () => {
      lightbox.remove();
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
    };

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', handleKeydown);
    document.body.style.overflow = 'hidden';
  });
});

let lastScrollY = window.scrollY;
const header = document.querySelector('header');

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 80) {
      header.classList.add('hide-nav');
      header.classList.remove('show-nav');
    } else {
      header.classList.remove('hide-nav');
      header.classList.add('show-nav');
    }
    lastScrollY = window.scrollY;
  });

  header.classList.add('show-nav');
}

const hamburger = document.querySelector('.hamburger');
const navUl = document.querySelector('nav ul');

if (hamburger && navUl) {
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.addEventListener('click', () => {
    const isOpen = navUl.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}