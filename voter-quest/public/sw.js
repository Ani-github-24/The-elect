const CACHE_NAME = 'voterquest-cache-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Cache CSS, translations.json and JS files dynamically
self.addEventListener('fetch', event => {
  if (
    event.request.url.includes('.css') || 
    event.request.url.includes('translations.json') ||
    event.request.url.includes('/_next/static')
  ) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
