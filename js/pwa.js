/* Registers the service worker and shows a small "Get the app" banner:
 * - Android/Chrome: one-tap install using the browser's install prompt.
 * - iPhone/iPad Safari: instructions for Share > Add to Home Screen.
 * Hidden when already installed, and for 30 days after being dismissed.
 */
(function () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js').catch(function () { /* site still works without it */ });
    });
  }

  var DISMISS_KEY = 'ew-install-dismissed';
  var DISMISS_DAYS = 30;

  var standalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (standalone) return;

  function recentlyDismissed() {
    try {
      var at = Number(localStorage.getItem(DISMISS_KEY));
      return at && Date.now() - at < DISMISS_DAYS * 864e5;
    } catch (e) { return false; }
  }

  function rememberDismissed() {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch (e) { /* ignore */ }
  }

  if (recentlyDismissed()) return;

  var ua = navigator.userAgent;
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isIOSSafari = isIOS && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/.test(ua);

  var banner = null;

  function addStyles() {
    if (document.getElementById('ew-install-style')) return;
    var style = document.createElement('style');
    style.id = 'ew-install-style';
    style.textContent =
      '.ew-install{position:fixed;left:16px;right:16px;bottom:92px;z-index:1060;max-width:420px;margin:0 auto;' +
      'display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:16px;background:#000562;color:#fff;' +
      'box-shadow:0 8px 24px rgba(0,0,0,.25);font-family:Montserrat,sans-serif;font-size:14px;line-height:1.4}' +
      '.ew-install img{width:44px;height:44px;border-radius:10px;flex:none;box-shadow:0 0 0 1px rgba(255,255,255,.35)}' +
      '.ew-install-text{flex:1;min-width:0}.ew-install-text strong{display:block;color:#FFD700}' +
      '.ew-install button{border:0;font:inherit;cursor:pointer}' +
      '.ew-install-go{background:#7ae1d5;color:#000;font-weight:700;padding:8px 14px;border-radius:20px;flex:none}' +
      '.ew-install-close{background:none;color:#fff;font-size:22px;line-height:1;padding:4px 6px;flex:none}';
    document.head.appendChild(style);
  }

  function hide(dismissed) {
    if (dismissed) rememberDismissed();
    if (banner) { banner.remove(); banner = null; }
  }

  function show(message, onInstall) {
    if (banner) return;
    addStyles();
    banner = document.createElement('div');
    banner.className = 'ew-install';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Install the Eir & Wild app');
    banner.innerHTML =
      '<img src="/images/app-icon-192.png" alt="">' +
      '<div class="ew-install-text"><strong>Get the Eir &amp; Wild app</strong><span></span></div>' +
      (onInstall ? '<button type="button" class="ew-install-go">Install</button>' : '') +
      '<button type="button" class="ew-install-close" aria-label="Dismiss">&times;</button>';
    banner.querySelector('.ew-install-text span').textContent = message;
    banner.querySelector('.ew-install-close').addEventListener('click', function () { hide(true); });
    if (onInstall) banner.querySelector('.ew-install-go').addEventListener('click', onInstall);
    document.body.appendChild(banner);
  }

  // Android / Chrome / Edge
  var deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    show('Quick access to classes and booking from your home screen.', function () {
      hide(false);
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choice) {
        if (choice.outcome !== 'accepted') rememberDismissed();
        deferredPrompt = null;
      });
    });
  });

  window.addEventListener('appinstalled', function () { hide(true); });

  // iPhone / iPad Safari has no install prompt, so explain how.
  if (isIOSSafari) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        show('Tap the Share button, then “Add to Home Screen”.');
      }, 3000);
    });
  }
})();
