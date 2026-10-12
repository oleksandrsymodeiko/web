/**
 * Mobile navigation toggle.
 * Handles: open/close, Escape to close, click-outside to close,
 * closing after a nav link is chosen, and keeping aria-expanded in sync.
 */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (!toggle || !nav) return;

  function openNav() {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeNav() {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function isOpen() {
    return nav.classList.contains('is-open');
  }

  toggle.addEventListener('click', function () {
    isOpen() ? closeNav() : openNav();
  });

  // Close after choosing a link — the menu shouldn't stay open on navigation.
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape, and return focus to the toggle button.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && isOpen()) {
      closeNav();
      toggle.focus();
    }
  });

  // Close on click outside the header.
  document.addEventListener('click', function (event) {
    var header = document.querySelector('.header');
    if (isOpen() && header && !header.contains(event.target)) {
      closeNav();
    }
  });

  // Reset the mobile state if the viewport grows while the menu is open.
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900 && isOpen()) closeNav();
  });
})();

// Load the decorative video only near the viewport. Pause it offscreen,
// in a background tab, on request, or when reduced motion is preferred.
(function () {
  var section = document.querySelector('.training');
  var video = document.querySelector('.training__video');
  var toggle = document.querySelector('.training__toggle');
  if (!section || !video || !toggle) return;

  var source = video.querySelector('source');
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var nearby = false;
  var userPaused = false;
  var loaded = false;
  video.muted = true;

  function updatePlayback() {
    if (motion.matches || !nearby || document.hidden || userPaused) {
      video.pause();
      return;
    }
    if (!loaded) {
      source.src = source.dataset.src;
      video.load();
      loaded = true;
      toggle.hidden = false;
    }
    // Autoplay may be blocked by browser settings; the Play button remains.
    var playback = video.play();
    if (playback) playback.catch(function () {});
  }

  video.addEventListener('playing', function () {
    video.classList.add('is-ready');
    toggle.textContent = 'Pause video';
  });
  video.addEventListener('pause', function () {
    toggle.textContent = 'Play video';
  });
  video.addEventListener('error', function () {
    video.classList.remove('is-ready');
    toggle.hidden = true;
  });
  toggle.addEventListener('click', function () {
    userPaused = !video.paused;
    updatePlayback();
  });
  motion.addEventListener('change', updatePlayback);
  document.addEventListener('visibilitychange', updatePlayback);

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      nearby = entries[0].isIntersecting;
      updatePlayback();
    }, { rootMargin: '100px' });
    observer.observe(section);
  } else {
    nearby = true;
    updatePlayback();
  }
})();

// The static demo has no form receiver. Keep browser validation active and
// explain this on submit instead of implying that a request was delivered.
(function () {
  var form = document.querySelector('.form');
  var status = document.querySelector('.form__status');
  if (!form || !status) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.hidden = false;
    status.textContent = 'This is a design demo. The request was not sent; connect a form service before publishing.';
    status.focus();
  });
})();
