/* Eir & Wild service worker
 * - Pages: network first, falling back to the last saved copy, then /offline.
 * - CSS/JS: network first so booking/timetable fixes show up straight away.
 * - Images, fonts and CDN files: served from cache, refreshed in the background.
 * - /api/ (live Bookwhen data) and Vercel analytics are never cached.
 * Bump VERSION whenever the precache list changes to clear old caches.
 */
const VERSION = 'v1';
const STATIC_CACHE = `eirandwild-static-${VERSION}`;
const PAGE_CACHE = `eirandwild-pages-${VERSION}`;
const OFFLINE_URL = '/offline';

const PRECACHE = [
  '/',
  OFFLINE_URL,
  '/manifest.json',
  '/images/app-icon-192.png',
];

const CDN_HOSTS = [
  'cdn.jsdelivr.net',
  'cdnjs.cloudflare.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE.map((url) => new Request(url, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith('eirandwild-') && key !== STATIC_CACHE && key !== PAGE_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

// Only keep responses that can be safely replayed later.
function cacheable(response) {
  return response && (response.ok || response.type === 'opaque') && !response.redirected;
}

async function networkFirst(request, cacheName, fallbackUrl) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (cacheable(response)) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await caches.match(request, { ignoreSearch: request.mode === 'navigate' });
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await caches.match(fallbackUrl);
      if (fallback) return fallback;
    }
    throw err;
  }
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then((response) => {
      if (cacheable(response)) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }
  return refresh;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin) {
    // Live data and analytics always go straight to the network.
    if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_vercel/')) return;

    if (request.mode === 'navigate') {
      event.respondWith(networkFirst(request, PAGE_CACHE, OFFLINE_URL));
      return;
    }

    if (/\.(?:css|js)$/.test(url.pathname)) {
      event.respondWith(networkFirst(request, STATIC_CACHE));
      return;
    }

    if (/\.(?:png|jpe?g|webp|gif|svg|ico|ttf|woff2?|json)$/.test(url.pathname)) {
      event.respondWith(staleWhileRevalidate(request, event));
    }
    return;
  }

  if (CDN_HOSTS.includes(url.hostname)) {
    event.respondWith(staleWhileRevalidate(request, event));
  }
});
