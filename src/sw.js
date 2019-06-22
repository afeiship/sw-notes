const CACHE_NAME = 'app_cache_v1.0.2';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/', 'app.js', 'style.css']).then(() => {
        self.skipWaiting();
      });
    })
  );
});

self.addEventListener('activate', (event) =>
  event.waitUntil(
    caches.keys().then((cacheList) =>
      Promise.all([
        cacheList.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            caches.delete(cacheName);
          }
        }),
        // 控制权发生变化
        self.clients.claim()
      ])
    )
  )
);

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(event.request.url);
  if (self.origin !== url.origin) return;
  event.respondWith(
    fetch(req).catch((e) => {
      // 如果失败，就回退到缓存里
      return caches.match(req);
    })
  );
});
