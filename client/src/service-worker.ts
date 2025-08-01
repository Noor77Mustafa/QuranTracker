// This is a basic service worker for caching assets and providing offline functionality
const CACHE_NAME = "myquran-cache-v1";

async function getAssetUrls(): Promise<string[]> {
  const urls = ["/", "/index.html"];

  try {
    const response = await fetch("/manifest.json");
    if (response.ok) {
      const manifest = await response.json();
      Object.values(manifest).forEach((entry: any) => {
        if (entry.file) urls.push("/" + entry.file);
        if (entry.css) urls.push(...entry.css.map((c: string) => "/" + c));
        if (entry.assets) urls.push(...entry.assets.map((a: string) => "/" + a));
      });
    }
  } catch (err) {
    console.error("Failed to fetch asset manifest", err);
  }

  return urls;
}

// Install event - cache assets from manifest
self.addEventListener("install", (event: any) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      const assets = await getAssetUrls();
      await cache.addAll(assets);
    })(),
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              // Don't cache API requests
              if (!event.request.url.includes('/api/')) {
                cache.put(event.request, responseToCache);
              }
            });
            
          return response;
        });
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event: any) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    (self as any).skipWaiting();
  }
});
