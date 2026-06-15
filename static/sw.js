// =============================================
// SERVICE WORKER — Full Offline PWA Support
// =============================================

const CACHE_NAME = "parikrama-sanstha-v1";

// All files to cache (Flask serves static from /static/)
const PRECACHE_URLS = [
  "/",
  "/static/css/style.css",
  "/static/js/i18n.js",
  "/static/js/app.js",
  "/manifest.json",
];

// ---- INSTALL ----
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// ---- ACTIVATE: clean old caches ----
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ---- FETCH ----
self.addEventListener("fetch", (event) => {
  // Navigation — network first, fallback to "/"
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match("/"))
    );
    return;
  }

  // Images — cache first, fetch on miss, SVG placeholder when offline
  if (event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then(cached => {
        if (cached) return cached;
        return fetch(event.request)
          .then(res => {
            const clone = res.clone();
            caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
            return res;
          })
          .catch(() => new Response(
            `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150">
              <rect width="200" height="150" fill="#f0dfc0"/>
              <text x="50%" y="50%" text-anchor="middle" fill="#a06010" font-size="14" dy=".3em">📷</text>
            </svg>`,
            { headers: { "Content-Type": "image/svg+xml" } }
          ));
      })
    );
    return;
  }

  // CSS / JS — cache first
  event.respondWith(
    caches.match(event.request).then(
      cached => cached || fetch(event.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        return res;
      })
    )
  );
});