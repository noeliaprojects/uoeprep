const VERSION = "uoe-v31";
const FILES = ["./","index.html","styles.css","data.js","app.js","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png"];
/* always ask the server (no-cache = check for a newer copy), so updates show up at once */
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES.map(f => new Request(f, {cache:"reload"})))));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const same = new URL(e.request.url).origin === location.origin;
  e.respondWith(
    (same ? fetch(e.request.url, {cache:"no-cache"}) : fetch(e.request)).then(r => {
      if (r.ok && same) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
