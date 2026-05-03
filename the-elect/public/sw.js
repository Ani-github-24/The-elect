const CACHE_NAME = 'the-elect-cache-v2';
const PRECACHE_URLS = [
  '/',
  '/manifest.json',
];

// Precache shell on install
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

// Clean old caches on activate
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Stale-while-revalidate for translations and API; cache-first for static assets
self.addEventListener('fetch', event => {
  const url = event.request.url;

  // Stale-while-revalidate for translations.json and any /api/ endpoints
  if (url.includes('translations.json') || url.includes('/api/')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(event.request).then(cachedResponse => {
          const networkFetch = fetch(event.request)
            .then(networkResponse => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            .catch(() => cachedResponse);

          // Return cached immediately, update cache in background
          return cachedResponse || networkFetch;
        })
      )
    );
    return;
  }

  // Cache-first for CSS and Next.js static bundles
  if (url.includes('.css') || url.includes('/_next/static')) {
    event.respondWith(
      caches.match(event.request).then(cached => {
        return cached || fetch(event.request).then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
    return;
  }

  // Network-first fallback for everything else
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
