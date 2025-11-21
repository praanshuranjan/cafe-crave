import './style.css';

const qs = (id) => document.getElementById(id);
const qsa = (ids) => ids.map((id) => qs(id));

const selectors = {
  heroLogo: 'hero-logo',
  navTarget: 'nav-logo-target',
  curtain: 'curtain-bg',
  loader: 'loader-overlay',
  heroText: 'hero-text',
  heroIcon: 'hero-icon-main',
  navLogo: 'nav-logo-container',
  navText: 'nav-text-container',
  navbar: 'navbar',
  player: 'music-player',
  tabLive: 'tab-live',
  tabAI: 'tab-ai',
  contentLive: 'content-live',
  contentAI: 'content-ai',
  aiInput: 'ai-input-view',
  aiLoading: 'ai-loading',
  aiResult: 'ai-result-view',
  moodInput: 'mood-input',
  resultTrack: 'result-track',
  resultArtist: 'result-artist',
  resultPairing: 'result-pairing',
  resultDesc: 'result-desc',
};

// Loading Animation Sequence with logo translation
window.addEventListener('load', () => {
  const [
    heroLogo,
    navLogoTarget,
    curtain,
    loaderOverlay,
    heroText,
    heroIconMain,
    navLogoContainer,
    navTextContainer,
  ] = qsa([
    selectors.heroLogo,
    selectors.navTarget,
    selectors.curtain,
    selectors.loader,
    selectors.heroText,
    selectors.heroIcon,
    selectors.navLogo,
    selectors.navText,
  ]);

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
  const navbar = qs(selectors.navbar);
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
  const player = qs(selectors.player);
  if (!player) return;

  if (player.classList.contains('hidden')) {
    player.classList.remove('hidden');
    player.classList.add('fade-in-up');
  } else {
    player.classList.add('hidden');
  }
}

function switchTab(tab) {
  const tabLive = qs(selectors.tabLive);
  const tabAI = qs(selectors.tabAI);
  const contentLive = qs(selectors.contentLive);
  const contentAI = qs(selectors.contentAI);

  if (!tabLive || !tabAI || !contentLive || !contentAI) return;

  if (tab === 'live') {
    tabLive.classList.add('text-crave-gold', 'border-crave-gold');
    tabLive.classList.remove('text-gray-500', 'border-transparent');
    tabAI.classList.remove('text-crave-gold', 'border-crave-gold');
    tabAI.classList.add('text-gray-500', 'border-transparent');
    contentLive.classList.remove('hidden');
    contentAI.classList.add('hidden');
  } else {
    tabAI.classList.add('text-crave-gold', 'border-crave-gold');
    tabAI.classList.remove('text-gray-500', 'border-transparent');
    tabLive.classList.remove('text-crave-gold', 'border-crave-gold');
    tabLive.classList.add('text-gray-500', 'border-transparent');
    contentAI.classList.remove('hidden');
    contentLive.classList.add('hidden');
  }
}

function resetAI() {
  const inputView = qs(selectors.aiInput);
  const resultView = qs(selectors.aiResult);
  const loadingView = qs(selectors.aiLoading);
  const moodInput = qs(selectors.moodInput);

  if (inputView) inputView.classList.remove('hidden');
  if (resultView) resultView.classList.add('hidden');
  if (loadingView) {
    loadingView.classList.add('hidden');
    loadingView.classList.remove('flex');
  }
  if (moodInput) moodInput.value = '';
}

function showAIState(state) {
  const inputView = qs(selectors.aiInput);
  const loadingView = qs(selectors.aiLoading);
  const resultView = qs(selectors.aiResult);

  if (!inputView || !loadingView || !resultView) return;

  if (state === 'input') {
    inputView.classList.remove('hidden');
    loadingView.classList.add('hidden');
    loadingView.classList.remove('flex');
    resultView.classList.add('hidden');
  } else if (state === 'loading') {
    inputView.classList.add('hidden');
    loadingView.classList.remove('hidden');
    loadingView.classList.add('flex');
    resultView.classList.add('hidden');
  } else if (state === 'result') {
    inputView.classList.add('hidden');
    loadingView.classList.add('hidden');
    loadingView.classList.remove('flex');
    resultView.classList.remove('hidden');
  }
}

async function generateVibe() {
  const moodInput = qs(selectors.moodInput);
  const resultTrack = qs(selectors.resultTrack);
  const resultArtist = qs(selectors.resultArtist);
  const resultPairing = qs(selectors.resultPairing);
  const resultDesc = qs(selectors.resultDesc);

  if (!moodInput || !resultTrack || !resultArtist || !resultPairing || !resultDesc) return;

  const mood = moodInput.value.trim();
  if (!mood) return;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    alert('Missing Gemini API key. Please set VITE_GEMINI_API_KEY in your environment.');
    return;
  }

  showAIState('loading');

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const systemPrompt =
    'You are the sophisticated virtual concierge of Cafe Crave, a high-end jazz restaurant. Your tone is elegant, mysterious, and welcoming. You specialize in pairing jazz music with gourmet food. Based on the user mood, suggest a real jazz standard (Track Name and Artist), a pairing dish (use a real-sounding fancy dish name), and a short, poetic description of why they match. Return only valid JSON with keys: "track", "artist", "pairing", "description".';

  const payload = {
    contents: [
      {
        parts: [{ text: `User Mood: ${mood}` }],
      },
    ],
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
    generationConfig: {
      responseMimeType: 'application/json',
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error('Invalid response');

    const result = JSON.parse(content);

    resultTrack.textContent = result.track ?? 'Unknown Track';
    resultArtist.textContent = result.artist ?? 'Unknown Artist';
    resultPairing.textContent = result.pairing ?? 'Chef surprise';
    resultDesc.textContent = result.description ? `"${result.description}"` : '';

    showAIState('result');
  } catch (error) {
    console.error('AI concierge error:', error);
    alert('The maestro is taking a short break. Please try again.');
    showAIState('input');
  }
}

// Expose helpers for inline handlers
window.toggleMusic = toggleMusic;
window.switchTab = switchTab;
window.generateVibe = generateVibe;
window.resetAI = resetAI;
