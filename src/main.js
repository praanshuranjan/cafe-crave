import './style.css';

const qs = (id) => document.getElementById(id);

// Loading Animation Sequence with logo translation
window.addEventListener('load', () => {
  const heroLogo = qs('hero-logo');
  const navLogoTarget = qs('nav-logo-target');
  const curtain = qs('curtain-bg');
  const loaderOverlay = qs('loader-overlay');
  const heroText = qs('hero-text');
  const heroIconMain = qs('hero-icon-main');
  const navLogoContainer = qs('nav-logo-container');
  const navTextContainer = qs('nav-text-container');

  if (
    !heroLogo ||
    !navLogoTarget ||
    !curtain ||
    !loaderOverlay ||
    !heroText ||
    !heroIconMain ||
    !navLogoContainer ||
    !navTextContainer
  ) {
    return;
  }

  setTimeout(() => {
    heroIconMain.classList.remove('animate-bounce');
    heroText.style.opacity = '0';

    const startRect = heroLogo.getBoundingClientRect();
    const endRect = navLogoTarget.getBoundingClientRect();

    const translateX = endRect.left - startRect.left;
    const translateY = endRect.top - startRect.top;
    const scale = 0.5;

    curtain.classList.add('slide-up');

    heroLogo.style.transition = 'transform 1.5s cubic-bezier(0.77, 0, 0.175, 1)';
    heroLogo.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

    setTimeout(() => {
      loaderOverlay.style.display = 'none';
      navLogoContainer.style.opacity = '1';
      navTextContainer.classList.add('visible');
    }, 1500);
  }, 2200);
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = qs('navbar');
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
  const player = qs('music-player');
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
