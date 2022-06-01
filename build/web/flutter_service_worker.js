'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"main.dart.js": "2238b89c718535c41fd788354268624c",
"assets/NOTICES": "fce79fd3953c2b0c72e7315f6f80f05b",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/assets/icons/language.svg": "2a24b070d1e2307ae1c687b073dee411",
"assets/assets/icons/home.svg": "7c62390ede3caf2de5a15131f3e9498f",
"assets/assets/icons/bookmark_fill.svg": "3ce8b5cdd626ecfec1417927e7a5530f",
"assets/assets/icons/back.svg": "6921e9fd35ab18b409d47e8930092b1d",
"assets/assets/icons/clock.svg": "7da21e67950c8e931a4b5121ead17306",
"assets/assets/icons/hot.svg": "15c3b4805ddd12c666abf485ce41ee7b",
"assets/assets/icons/pot.svg": "2c5eb25740000a6a2830cc75510e5f9e",
"assets/assets/icons/logo.svg": "69deaa8d8007906ab5a540a14d3b5544",
"assets/assets/icons/camera.svg": "8c11fc23eb859dcb00de34feef722f31",
"assets/assets/icons/chef_color.svg": "a55576bf098ac0896c35caf6c93abfc1",
"assets/assets/icons/menu.svg": "9ab8b14eb739bfd1e1b8760daeffe934",
"assets/assets/icons/bookmark.svg": "2decc3b714d88c28a2f0027a4d2f6238",
"assets/assets/icons/info.svg": "ff386be84e86dd9e863da690ea02816f",
"assets/assets/icons/user.svg": "d99deaa37991c239d39737151b842eb3",
"assets/assets/icons/heart_fill.svg": "a3706f27e213ded0bbff348643584dc2",
"assets/assets/icons/chef.svg": "77006e53845afc7cfa75847ca91d16e7",
"assets/assets/icons/bowl.svg": "293bcc9862f3204eb022aa5fac66fc50",
"assets/assets/icons/list.svg": "9d20bbd7353495cda4923d7e708f8fd0",
"assets/assets/icons/search.svg": "13dd596427a509f269207dfc84dcb967",
"assets/assets/icons/chef_nav.svg": "07c21072c18d04f2dc45195fc44a3965",
"assets/assets/images/chef_1.png": "ea2eafc20dde3439a37de7433b9e1d6f",
"assets/assets/images/kisspng_chicken_tikka.png": "b7fec39bde62e50804d6edb8967b2abd",
"assets/assets/images/cook_new.png": "dc7f8d03cf26a723a8fe82e1ba4a2845",
"assets/assets/images/food_court@2x.png": "1b50345d81260512176e4c4b68aa4b17",
"assets/assets/images/image_2.png": "47054e390b3f1bbc91593df43413d4c0",
"assets/assets/images/best_2020@2x.png": "91909759cb6933876ad04a1aefdc4f11",
"assets/assets/images/pic.png": "6011f2943b1b058967dc174106ebfda5",
"assets/assets/images/best_2020.png": "0dfdf4c8a02842b6315b82e08796d87e",
"assets/assets/images/logo.png": "dfeb612f66778cbc1811f4c9ac9d6278",
"assets/assets/images/cook_new@2x.png": "be9db31ed5b3a25c67038539eb9f8b0f",
"assets/assets/images/image_1.png": "0657c4ea4e24cdc83cc0a7fc6318ec89",
"assets/assets/images/food_court.png": "68bf8a9972ab39db1cb9a324d0c91a67",
"assets/assets/images/chef_2.png": "2ebf612dff4b20574205efd2f5a8eac7",
"assets/assets/images/chef_3.png": "c243fbf33d2f4c15a2ba2ce32d500f57",
"assets/assets/images/image_camera.png": "700aebe00c2b94486ce87c3d4b3502b4",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.json": "013511e8517fbd090babac645b7d4701",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"version.json": "e5fa606aac98a7856da7e292a85ba1ac",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"index.html": "36319dd0441cc550e46331d607d70805",
"/": "36319dd0441cc550e46331d607d70805",
"manifest.json": "a18a828a0cddecb0aa028119b590cd68"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
