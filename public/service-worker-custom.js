/* eslint-disable no-restricted-globals */
console.log("My coustom service wrker");

// Any other custom service worker logic can go here.
const staticCacheName = "site-static-v2";
const dynamicCacheName = "site-dynamic-v1";
const assets = ["/", "/index.html"];

// install event
self.addEventListener("install", (evt) => {
  console.log("service worker installed from custom");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  console.log("service worker activated from custom");
  evt.waitUntil(
    caches.keys().then((keys) => {
      console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (evt) => {
  console.log("fetch event from custom", evt);
  if (!(evt.request.url.indexOf("http") === 0)) return;
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(dynamicCacheName).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
