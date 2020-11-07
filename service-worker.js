importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js");

if (workbox) {
	console.log("Workbox berhasil dimuat");
} else {
	console.log("Workbox gagal dimuat");
}

workbox.precaching.precacheAndRoute([
	{ url: "./", revision: "1" },
	{ url: "./index.html", revision: "1" },
	// { url: "./pages/match.html", revision: "1" },
	// { url: "./pages/standing.html", revision: "1" },
	// { url: "./pages/team.html", revision: "1" },
	// { url: "./pages/favorite.html", revision: "1" },
	{ url: "./css/materialize.min.css", revision: "1" },
	{ url: "./css/styles.css", revision: "1" },
	{ url: "./js/materialize.min.js", revision: "1" },
	{ url: "./js/nav.js", revision: "1" },
	{ url: "./js/api.js", revision: "1" },
	{ url: "./js/db.js", revision: "1" },
	{ url: "./js/idb.js", revision: "1" },
	{ url: "./manifest.json", revision: "1" },
	{ url: "./icon/maskable_icon-192x192.png", revision: "1" },
	{ url: "./icon/maskable_icon-512x512.png", revision: "1" },
	// { url: "https://fonts.googleapis.com/icon?family=Material+Icons", revision: "1" },
	// { url: "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2", revision: "1" },
], {
	ignoreURLParametersMatching: [/.*/]
});

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
