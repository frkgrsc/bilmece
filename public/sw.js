const CACHE_NAME = 'milyoner-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png',
  '/icon_maskable.png',
  '/icon-192.png',
  '/screenshot1.png',
  '/screenshot2.png'
];

// 1. Install event: pre-cache static layout elements
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching core game assets');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.error('[Service Worker] Pre-cache failed (some files might be generated during build):', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate event: clear out outdated cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting obsolete cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch event: intercept requests for offline usage with fallback logic
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass Firebase firestore, auth, cloud functions, and non-GET requests
  if (
    event.request.method !== 'GET' ||
    url.hostname.includes('firestore.googleapis.com') ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('firebaseapp.com') ||
    url.pathname.includes('/api/') ||
    url.hostname.includes('localhost') && url.port === '3000' && (url.pathname.includes('/@vite/') || url.pathname.includes('/@react/'))
  ) {
    return; // Pass through to the network naturally
  }

  // Stale-While-Revalidate caching strategy for assets (serves quickly, updates in background)
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Only cache successful standard responses
            if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch((err) => {
            console.log('[Service Worker] Network request failed; offline survival activated:', err);
            // Return cached response if offline & fetch fails
            return cachedResponse;
          });

        // Serve cached response immediately, fallback to fetch promise
        return cachedResponse || fetchPromise;
      });
    })
  );
});
