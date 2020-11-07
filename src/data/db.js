import idb from "idb/lib/idb.js";

let dbPromised = idb.open("football-api", 1, (upgradeDb) => {
	let teamsObjectStore = upgradeDb.createObjectStore("teams", {
		keyPath: "id"
	});
    
	teamsObjectStore.createIndex("id", "id", { unique: true });
});

function saveFavoriteTeam(team) {
	dbPromised
		.then((db) => {
			let tx = db.transaction("teams", "readwrite");
			let store = tx.objectStore("teams");
			store.add(team);
			return tx.complete;
		})
		.then(() => {
			console.log("Team Favorite berhasil di simpan.");
		})
		.catch(() => {
			console.log("Team Favorite gagal di simpan.");
		});
}

function deleteFavoriteTeam(teamId) {
	dbPromised
		.then((db) => {
			let tx = db.transaction("teams", "readwrite");
			let store = tx.objectStore("teams");
			store.delete(teamId);
			return tx.complete;
		})
		.then(() => {
			console.log("Team Favorite berhasil di hapus.");
		})
		.catch(() => {
			console.log("Team Favorite gagal di hapus.");
		});
}

function getAllFavoriteTeam() {
	return new Promise((resolve) => {
		dbPromised
			.then((db) => {
				let tx = db.transaction("teams", "readonly");
				let store = tx.objectStore("teams");
				return store.getAll();
			})
			.then((teams) => {
				resolve(teams);
			});
	});
}

function checkFavoriteTeamById(teamId) {
	return new Promise((resolve) => { 
		dbPromised
			.then((db) => {
				let tx = db.transaction("teams", "readonly");
				let store = tx.objectStore("teams");
				return store.get(teamId);
			})
			.then((team) => {
				if(team) {
					resolve(true);
				}
				else {
					resolve(false);
				}
			});
	});
}

export { saveFavoriteTeam, deleteFavoriteTeam, checkFavoriteTeamById };
export { getAllFavoriteTeam };
