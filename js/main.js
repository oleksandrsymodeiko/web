/**
 * Mobile navigation toggle.
 * Only JS on the page — everything else is HTML/CSS.
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
    if (window.innerWidth > 768 && isOpen()) closeNav();
  });
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
