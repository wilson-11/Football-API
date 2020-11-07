import { printTeams, printStandings, printMatches, printFavorites } from "../view/pages.js";
import { getAllFavoriteTeam } from "./db.js";

const base_url = "https://api.football-data.org/v2/";

function status(response) {
	if (response.status !== 200) {
		console.log(`Error : ${response.status}`);
		return Promise.reject(new Error(response.statusText));
	} else {
		return Promise.resolve(response);
	}
}

function json(response) {
	return response.json();
}

function error(error) {
	console.log(`Error : ${error}`);
}

function getTeams() {
	if ("caches" in window) {
		caches.match(`${base_url}teams`).then((response) => {
			if(response) {
				response.json().then(printTeams);
			}
		});
	}

	fetch(`${base_url}teams`, {
		headers: {
			"X-Auth-Token": "ab2976308882487387f571c3826fbdfb"
		},
	}).then(status)
		.then(json)
		.then(printTeams)
		.catch(error);
}

function getFavorites() {
	getAllFavoriteTeam().then(printFavorites);
}

function getStandings() {
	if ("caches" in window) {
		caches.match(`${base_url}competitions/2001/standings?standingType=TOTAL`).then((response) => {
			if(response) {
				response.json().then(printStandings);
			}
		});
	}

	fetch(`${base_url}competitions/2001/standings?standingType=TOTAL`, {
		headers: {
			"X-Auth-Token": "ab2976308882487387f571c3826fbdfb"
		},
	}).then(status)
		.then(json)
		.then(printStandings)
		.catch(error);
}

function getMatches(selectedValue) {
	let matchday = "";
	if(selectedValue.includes("GROUP_STAGE")) {
		matchday = selectedValue.split(",")[1];
	}

	if ("caches" in window) {
		caches.match(`${base_url}competitions/2001/matches?stage=${selectedValue}&matchday=${matchday}`).then((response) => {
			if(response) {
				response.json().then(printMatches);
			}
		});
	}

	fetch(`${base_url}competitions/2001/matches?stage=${selectedValue}&matchday=${matchday}`, {
		headers: {
			"X-Auth-Token": "ab2976308882487387f571c3826fbdfb"
		},
	}).then(status)
		.then(json)
		.then(printMatches)
		.catch(error);
}

export { getTeams, getFavorites, getStandings, getMatches };
