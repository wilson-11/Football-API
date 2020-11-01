const CACHE_NAME = "firstpwa-v1";
const urlsToCache = [
	"./",
	"./nav.html",
	"./index.html",
	"./pages/match.html",
	"./pages/standing.html",
	"./pages/team.html",
	"./pages/favorite.html",
	"./css/materialize.min.css",
	"./css/styles.css",
	"./js/materialize.min.js",
	"./js/nav.js",
	"./js/api.js",
	"./js/db.js",
	"./js/idb.js",
	"./manifest.json",
	"./icon/maskable_icon-192x192.png",
	"./icon/maskable_icon-512x512.png",
	"https://fonts.googleapis.com/icon?family=Material+Icons"
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener("fetch", (event) => {
	const base_url = "https://api.football-data.org/v2/";

	if (event.request.url.indexOf(base_url) > -1) { 
		event.respondWith(
			caches.open(CACHE_NAME).then((cache) => {
				return fetch(event.request).then((response) => {
					cache.put(event.request.url, response.clone());
					return response;
				});
			})
		);
	} else {
		event.respondWith(
			caches.match(event.request, { ignoreSearch: true }).then((response) => {
				return response || fetch (event.request);
			})
		);
	}
});

self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName != CACHE_NAME) {
						console.log("ServiceWorker: cache " + cacheName + " dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
});

self.addEventListener("push", (event) => {
	let body;
	if (event.data) {
		body = event.data.text();
	} else {
		body = "Push message no payload";
	}
	let options = {
		body: body,
		icon: "...",
		vibrate: [100, 50, 100],
		data: {
			dateOfArrival: Date.now(),
			primaryKey: 1
		}
	};
	event.waitUntil(
		self.registration.showNotification("Push Notification", options)
	);
});
