importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

if (workbox) {
	console.log("Workbox berhasil dimuat");
} else {
	console.log("Workbox gagal dimuat");
}

workbox.core.skipWaiting();
workbox.core.clientsClaim();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, { ignoreURLParametersMatching: [/.*/] });

workbox.routing.registerRoute(
	new RegExp("/^https:\\/\\/crests\\.football-data\\.org/"),
	new workbox.strategies.CacheFirst({
		cacheName: "images",
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60
			})
		]
	})
);

workbox.routing.registerRoute(
	new RegExp("/^https:\\/\\/fonts\\.googleapis\\.com/"),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: "google-fonts-stylesheets",
	})
);

workbox.routing.registerRoute(
	new RegExp("/^https:\\/\\/fonts\\.gstatic\\.com/"),
	new workbox.strategies.CacheFirst({
		cacheName: "google-fonts-webfonts",
		plugins: [
			new workbox.expiration.ExpirationPlugin({
				maxEntries: 60,
				maxAgeSeconds: 30 * 24 * 60 * 60
			})
		]
	})
);

workbox.routing.registerRoute(
	new RegExp("/pages/"),
	new workbox.strategies.CacheFirst({
		cacheName: "pages"
	})
);

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
