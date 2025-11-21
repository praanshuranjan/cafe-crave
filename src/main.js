import './style.css';

// Loading Animation Sequence
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader')?.classList.add('curtain-rise');
  }, 2500);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  if (window.scrollY > 50) {
    navbar.classList.add('bg-crave-black/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
    navbar.classList.remove('py-6');
  } else {
    navbar.classList.remove('bg-crave-black/90', 'backdrop-blur-md', 'shadow-lg', 'py-4');
    navbar.classList.add('py-6');
  }
});

// Music Widget Toggle
function toggleMusic() {
  const player = document.getElementById('music-player');
  if (!player) return;

  if (player.classList.contains('hidden')) {
    player.classList.remove('hidden');
    player.classList.add('fade-in-up');
  } else {
    player.classList.add('hidden');
  }
}

// Expose toggle so inline button can use it
window.toggleMusic = toggleMusic;
