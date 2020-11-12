let webPush = require("web-push");

const vapidKeys = {
	"publicKey": "BBhe-v3Twb8jeuJYxPQbcv0BNgcwCcMeX8XLdjkQvZC-Ud0etKt4SmPRER0l_0J5R3HSGueS7fMjUDMbCVOqx7M",
	"privateKey": "w1o0QHc4HXku5hkwdjO6Gc2DXCXnk57JsJ2obY8B-6M"
};

webPush.setVapidDetails(
	"mailto:supersecret@domain.org",
	vapidKeys.publicKey,
	vapidKeys.privateKey
);

let pushSubscription = {
	"endpoint": "https://fcm.googleapis.com/fcm/send/co9KT03ucDQ:APA91bEtspIKirWnZMYArNibglyWRX7dLsdP48nZMM8p86o-dbhxVUV0MxCbEyEPkyzdN4444Wiqed8GE0HBX9Gj5NTzZd5JZwMrlwA0jv7nqu9Bq8kWH55QLl8Ds1KmYFZooHTEaDBR",
	"keys": {
		"p256dh": "BN6ZzdSxFH80Zh9vHMMblkL6lwNXqCoYFUTW7c7IRH6sTEeVETKI3qwCu+Y1+MUhB1PwgdSDpoP7hhVcZIdi4Us=",
		"auth": "fuT2pLQiFg73WJrTYHd6cg=="
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
