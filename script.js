// DOM Elements
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMenuButton = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const musicPlayer = document.getElementById('music-player');

// Loader Animation
window.addEventListener('load', function() {
  setTimeout(function() {
    loader.classList.add('curtain-rise');
  }, 2000);
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
mobileMenuButton.addEventListener('click', function() {
  mobileMenu.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});

closeMenuButton.addEventListener('click', function() {
  mobileMenu.classList.add('hidden');
  document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', function() {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = 'auto';
  });
});

// Music Player Toggle
function toggleMusic() {
  musicPlayer.classList.toggle('hidden');
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Form Submission
const reservationForm = document.querySelector('#reservations form');
if (reservationForm) {
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your reservation! We will contact you shortly to confirm.');
    this.reset();
  });
}

// Animation on Scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
    }
  });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('#about, #music, #menu, #gallery, #reservations').forEach(section => {
  observer.observe(section);
});

// Initialize animations for elements already in view
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.fade-in-up').forEach(el => {
    if (isInViewport(el)) {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});

// Helper function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}