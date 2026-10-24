const CACHE = 'coleccion-v1';   // súbelo a v2, v3… cuando publiques cambios
// Rutas relativas a la ubicación de sw.js (así valen con basePath). Lo demás se guarda al vuelo.
const BASE = ['./', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(BASE)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks =>
    Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

// stale-while-revalidate: responde con lo guardado y actualiza la copia en segundo plano
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).hostname.endsWith('wikipedia.org')) return;
  e.respondWith(
    caches.match(e.request).then(guardado => {
      const red = fetch(e.request).then(r => {
        if (r && (r.ok || r.type === 'opaque')) {
          const copia = r.clone();
          caches.open(CACHE).then(c => c.put(e.request, copia));
        }
        return r;
      }).catch(() => guardado);
      return guardado || red;
    })
  );
});
