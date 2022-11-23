// /* eslint-disable no-restricted-globals */
// console.log("My custom service worker");

// // Any other custom service worker logic can go here.
// const staticCacheName = "cache-static-v1";
// const dynamicCacheName = "cache-dynamic-v1";
// const assets = [
//   "/index.html",
//   "/src/index.ccs",
//   "/manifest.json",
//   "/service-worker-custom.js",
//   " /static/css/main.82d9f8ae.css",
//   "/img-svg/img/pwaLogo/logo512.png",
//   "/img-svg/img/pwaLogo/logo384.png",
//   "/img-svg/img/pwaLogo/logo192.png",
//   "/img-svg/img/pwaLogo/logo152.png",
//   "/img-svg/img/pwaLogo/logo144.png",
//   "/img-svg/img/pwaLogo/logo128.png",
//   "/img-svg/img/pwaLogo/logo96.png",
//   "/img-svg/img/pwaLogo/logo72.png",
//   "https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh7USSwiPGQ.woff2",
//   "https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wXg.woff2",
//   "https://fonts.gstatic.com/s/lato/v23/S6u9w4BMUTPHh6UVSwiPGQ.woff2",
//   "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
// ];

// //cache size limit
// const CacheSize = (name, size) => {
//   caches.open(name).then((cache) => {
//     cache.keys().then((keys) => {
//       if (keys.length > size) {
//         cache.delete(keys[0]).then(CacheSize(name, size));
//       }
//     });
//   });
// };

// // install event
// self.addEventListener("install", (evt) => {
//   // console.log("service worker installed from custom");

//   evt.waitUntil(
//     caches.open(staticCacheName).then((cache) => {
//       console.log("caching shell assets");
//       cache.addAll(assets);
//     })
//   );
// });

// // activate event
// self.addEventListener("activate", (evt) => {
//   // console.log("service worker activated from custom");
//   evt.waitUntil(
//     caches.keys().then((keys) => {
//       console.log(keys);
//       return Promise.all(
//         keys
//           .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
//           .map((key) => caches.delete(key))
//       );
//     })
//   );
// });

// // fetch event
// self.addEventListener("fetch", (evt) => {
//   // console.log("fetch event from custom", evt);
//   if (!evt.request.url.indexOf("firestore.googleapis.com") === -1) {
//     evt.respondWith(
//       caches.match(evt.request).then((cacheRes) => {
//         return (
//           cacheRes ||
//           fetch(evt.request).then((fetchRes) => {
//             return caches.open(dynamicCacheName).then((cache) => {
//               cache.put(evt.request.url, fetchRes.clone());
//               CacheSize(dynamicCacheName, 15);
//               return fetchRes;
//             });
//           })
//         );
//       })
//     );
//   }
// });
