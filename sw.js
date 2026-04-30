// Jarvis SW v20 — sprint/5c-2-5a-users-invite: Admin Users + invite + OTP modal
const CACHE = 'jarvis-v20';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  var url = new URL(e.request.url);

  // Never cache Supabase API responses
  if (url.hostname.indexOf('supabase.co') !== -1) return;

  // HTML pages: network-first, fall back to cache only if offline
  if (e.request.mode === 'navigate' || (e.request.headers.get('accept') || '').indexOf('text/html') !== -1) {
    e.respondWith(
      fetch(e.request).then(function(resp) {
        var copy = resp.clone();
        caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        return resp;
      }).catch(function() {
        return caches.match(e.request);
      })
    );
    return;
  }

  // Other assets (manifest, icon): cache-first is fine
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(resp) {
        if (resp.ok) {
          var copy = resp.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, copy); });
        }
        return resp;
      });
    })
  );
});

// Allow page to force-reload SW
self.addEventListener('message', function(e) {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});