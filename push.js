let webPush = require("web-push");

const vapidKeys = {
	"publicKey": "BHiRVFdjSSEqYGOjFCzqstrihD6P_uh7_82_Su_H7Apem0IqmggnXEz2NE6arEwQTOu5S9OH7vPqzIs4ras5tVU", 
	"privateKey": "C-7qmQsDrXXPqwI2Kywo838829drFFChE6-nXckuEXg"
};

webPush.setVapidDetails(
	"mailto:supersecret@domain.org",
	vapidKeys.publicKey,
	vapidKeys.privateKey
);

let pushSubscription = {
	"endpoint": "https://fcm.googleapis.com/fcm/send/f98o9rQlGv4:APA91bFt2Ytz0ItJjJcY6jnkFTR4gLecJe3430LqhLMNwRYg3-oPLlhgqRHaAgUwfjp3p-ES5IJUa6dcgQ-6yEJxx5R2gflbby13qrCMoEB6SqxTbv87wrXoINoauwwd7k5g1VxRV998",
	"keys": {
		"p256dh": "BJ2hwZ3PaI6EFHUTKdg9IO3eG1GB70xxvJ1u3Q30nrBObnOm8d7XItRjeEVMW7loSsOrhCiDMqcnKBt1TCiWad8=", 
		"auth": "bsu7PrRTjf5ezMAtxTFz+w=="
	}
};

let payload = "Football API sudah dapat menerima push notifikasi!";
let options = {
	gcmAPIKey: "804638642260",
	TTL: 60
};

webPush.sendNotification(
	pushSubscription,
	payload,
	options
);