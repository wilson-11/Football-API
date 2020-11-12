import "regenerator-runtime";
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import "./css/styles.css";
import { main } from "./view/main.js";

main();

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		registerServiceWorker();
		requestPermission();
	});
} else {
	console.log("ServiceWorker belum didukung browser ini.");
}

function registerServiceWorker() {
	return navigator.serviceWorker.register("service-worker.js")
		.then(async (registration) => {
			await navigator.serviceWorker.ready;
			console.log("Registrasi service worker berhasil.");
			registration.pushManager.subscribe({userVisibleOnly: true});
			return registration;
		})
		.catch((e) => {
			console.error("Registrasi service worker gagal.", e);
		});
}

function requestPermission() {
	if ("Notification" in window) {
		Notification.requestPermission().then((result) => {
			if (result === "denied") {
				console.log("Fitur notifikasi tidak diijinkan.");
				return;
			} else if (result === "default") {
				console.error("Pengguna menutup kotak dialog permintaan ijin.");
				return;
			}
			navigator.serviceWorker.ready.then(() => {
				if (("PushManager" in window)) {
					navigator.serviceWorker.getRegistration().then((registration) => {
						registration.pushManager.subscribe({
							userVisibleOnly: true,
							applicationServerKey: urlBase64ToUint8Array("BBhe-v3Twb8jeuJYxPQbcv0BNgcwCcMeX8XLdjkQvZC-Ud0etKt4SmPRER0l_0J5R3HSGueS7fMjUDMbCVOqx7M")
						}).then((subscribe) => {
							console.log("Berhasil melakukan subscribe dengan endpoint: ", subscribe.endpoint);
							console.log("Berhasil melakukan subscribe dengan p256dh key: ", btoa(String.fromCharCode.apply(
								null, new Uint8Array(subscribe.getKey("p256dh")))));
							console.log("Berhasil melakukan subscribe dengan auth key: ", btoa(String.fromCharCode.apply(
								null, new Uint8Array(subscribe.getKey("auth")))));
						}).catch((e) => {
							console.error("Tidak dapat melakukan subscribe ", e.message);
						});
					});
				}
			});

		});
	}
}

function urlBase64ToUint8Array(base64String) {
	const padding = "=".repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/-/g, "+")
		.replace(/_/g, "/");
	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}
