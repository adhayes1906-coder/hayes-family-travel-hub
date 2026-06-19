const CACHE_NAME = "team-hayes-travel-v5";

const CORE_FILES = [

  "./",

  "./index.html",

  "./data.js"

];

self.addEventListener("install", (event) => {

  self.skipWaiting();

  event.waitUntil(

    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_FILES))

  );

});

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((keys) =>

      Promise.all(

        keys.map((key) => key !== CACHE_NAME ? caches.delete(key) : Promise.resolve())

      )

    )

  );

  self.clients.claim();

});

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;

  event.respondWith(

    fetch(event.request)

      .then((response) => {

        const copy = response.clone();

        if (event.request.url.startsWith(self.location.origin)) {

          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));

        }

        return response;

      })

      .catch(() => caches.match(event.request))

  );

});
