// Steady service worker.
// The page (HTML) is network-first, so updates appear as soon as the phone is online.
// Everything else (icons, manifest, fonts) is cache-first: bump CACHE when those change.
const CACHE = 'steady-v1';
const ASSETS = ['./', './index.html', './manifest.webmanifest',
  './icons/apple-touch-icon.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const isPage = e.request.mode === 'navigate' || e.request.url.endsWith('.html');
  const keep = res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; };

  if (isPage) {
    e.respondWith(fetch(e.request).then(keep)
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(keep)));
  }
});
