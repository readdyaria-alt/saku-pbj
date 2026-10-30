// Service worker: menyimpan semua file agar aplikasi bisa dibuka offline.
// Naikkan VERSION setiap kali isi aplikasi diperbarui.
const VERSION = 'saku-pbj-v8';
const FILES = [
  './', './index.html', './manifest.webmanifest', './logo.png',
  './pam-icon-192.png', './pam-icon-512.png', './pam-icon-maskable-512.png',
  './pam-apple-touch-icon.png', './pam-favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const fresh = e.request.mode === 'navigate' || url.pathname.endsWith('.webmanifest') || url.pathname.endsWith('.html') || url.pathname.endsWith('/');
  const save = res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); } return res; };
  if (fresh) {
    // Halaman & manifest: ambil dari jaringan dulu agar pembaruan langsung terlihat; offline -> pakai cache.
    e.respondWith(fetch(e.request, { cache: 'no-cache' }).then(save)
      .catch(() => caches.match(e.request, { ignoreSearch: true }).then(hit => hit || caches.match('./index.html'))));
    return;
  }
  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(save)).catch(() => caches.match('./index.html')));
});
