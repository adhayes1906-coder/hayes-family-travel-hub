const CACHE="travel-hub-vFinal";

self.addEventListener("install",e=>{
  e.waitUntil(
    caches.open(CACHE).then(c=>c.addAll([
      "./",
      "./index.html",
      "./nyc_family_trip_subway_guide.png.png"
    ]))
  );
});

self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  );
});
