import { saveFavoriteTeam, deleteFavoriteTeam, checkFavoriteTeamById } from "../data/db.js";

function printTeams(data) {
	let teamsElement = document.createElement("div");
	if(data.teams.length === 0) {
		teamsElement.innerHTML = `
		  <div class="col s12 m8 offset-m2 center-align">
			<p class="text-flow">No teams were found.</p>
		  </div>
		`;
	} else {
		data.teams.forEach((team) => {
			if (team.crestUrl) {
				team.crestUrl = team.crestUrl.replace(/^http:\/\//i, "https://");
			}
			let teamElement = document.createElement("div");
			checkFavoriteTeamById(team.id).then((isTeamFavorite) => {
				team.favorite = isTeamFavorite;
				teamElement.innerHTML = `
				  <div class="col s6 m3">
					<div class="card p-10">
					  <div class="row">
						  <div class="col s12 card-image">
							  <img src="${team.crestUrl}" alt="Gambar Club" class="responsive-image">
						  </div>
					  </div>
					  <div>
						<p class="center-align flow-text truncate">${team.shortName}</p>
					  </div>
					  <div class="right-align">
						<a>${team.favorite === true ? "<i class=\"material-icons\">favorite</i>" : "<i class=\"material-icons\">favorite_border</i>"}</a>
					  </div>
					</div>
				  </div>
				`;
				teamElement.querySelector("a").addEventListener("click", function() {
					if(team.favorite === false) {
						let savedTeam = {
							id: team.id,
							crestUrl: team.crestUrl,
							shortName: team.shortName
						};
						saveFavoriteTeam(savedTeam);
						team.favorite = true;
						this.innerHTML = "<i class=\"material-icons\">favorite</i>";
					} else {
						deleteFavoriteTeam(team.id);
						team.favorite = false;
						this.innerHTML = "<i class=\"material-icons\">favorite_border</i>";
					}
				});
				teamsElement.appendChild(teamElement);
			});
		});
	}

	document.getElementById("teams").appendChild(teamsElement);
}

function printStandings(data) {
	data.standings.forEach((section) => {
		let colElement = document.createElement("div");
		colElement.classList += "card col s12";

		let titleElement = document.createElement("h5");
		titleElement.innerHTML = `${section.group}`;
		colElement.appendChild(titleElement);

		let tableElement = document.createElement("table");
		tableElement.classList += "highlight responsive-table";

		let theadElement = document.createElement("thead");
		theadElement.innerHTML = `
		  <tr>
			<th>Teams</th>
			<th>MP</th>
			<th>W</th>
			<th>D</th>
			<th>L</th>
			<th>GA</th>
			<th>GD</th>
			<th>GF</th>
			<th>Pts</th>
			<th>Status</th>
		  </tr>
		`;
		tableElement.appendChild(theadElement);

		let tbodyElement = document.createElement("tbody");
		tableElement.appendChild(tbodyElement);

		section.table.forEach((standing) => {
			let rowElement = document.createElement("tr");
			let form = "";
			if (standing.form) {
				standing.form.split(",").forEach((status) => {
					if(status === "W") {
						form += "<i class=\"material-icons\">flag</i>";
					} else if(status === "L") {
						form += "<i class=\"material-icons\">clear</i>";
					} else {
						form += "<i class=\"material-icons\">drag_handle</i>";
					}
				});
			}
			rowElement.innerHTML = `
			  <td>${standing.team.name}</td>
			  <td>${standing.playedGames}</td>
			  <td>${standing.won}</td>
			  <td>${standing.draw}</td>
			  <td>${standing.lost}</td>
			  <td>${standing.goalsFor}</td>
			  <td>${standing.goalsAgainst}</td>
			  <td>${standing.goalDifference}</td>
			  <td>${standing.points}</td>
			  <td>${form}</td>
			`;
			tbodyElement.appendChild(rowElement);
		});

		colElement.appendChild(tableElement);
		document.getElementById("standings").appendChild(colElement);
	});
}

function printMatches(data) {
	let matchesHTML = "";
	if(data.matches.length === 0) {
		matchesHTML = `
		  <div class="col s12 m8 offset-m2 center-align">
			<p class="text-flow">No matches were found.</p>
		  </div>
		  `;
	} else {
		data.matches.forEach((match) => {
			let homeTeamScore = match.score.fullTime.homeTeam;
			let awayTeamScore = match.score.fullTime.awayTeam;
			let homeTeamFlag = "";
			let awayTeamFlag = "";
			if(match.score.winner === "HOME_TEAM") {
				homeTeamFlag = "flag";
				awayTeamFlag = "clear";
			} else if(match.score.winner === "AWAY_TEAM") {
				homeTeamFlag = "clear";
				awayTeamFlag = "flag";
			} else {
				homeTeamFlag = "drag_handle";
				awayTeamFlag = "drag_handle";
			}

			let matchHTML = `
				<div class="col s12 m8 offset-m2">
					<div class="card">
						<div class="card-content">
							<div class="row">
								<div class="col s6 left-align">
									<p class="text-flow">${match.utcDate}</p>
								</div>
								<div class="col s6 right-align">
									<p class="text-flow">${match.status}</p>
								</div>
							</div>
							<div class="row">
								<div class="col s12">
									<div class="col s4 center-align">
										<p class="text-flow">${match.homeTeam.name}</h5>
									</div>
									<div class="col s4 center-align">                        
										<p class="text-flow">${homeTeamScore} VS ${awayTeamScore}</p>
									</div>
									<div class="col s4 center-align">
										<p class="text-flow">${match.awayTeam.name}</p>
									</div>
								</div>
							</div>
							<div class="row mb-0">
								<div class="col s12">
									<div class="col s6 right-align">
										<i class="material-icons">${homeTeamFlag}</i>
									</div>
									<div class="col s6 left-align">                        
										<i class="material-icons">${awayTeamFlag}</i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			  `;

			matchesHTML += matchHTML;
		});
	}

	document.getElementById("matches").innerHTML = matchesHTML;
}

function printFavorites(favorites) {
	let favoritesElement = document.createElement("div");
	if(favorites.length === 0) {
		favoritesElement.innerHTML = `
		  <div class="col s12 m8 offset-m2 center-align">
			<p class="text-flow">No favorite teams were found.</p>
		  </div>
		`;
	} else {
		favorites.forEach((favorite) => {
			let favoriteElement = document.createElement("div");
			favoriteElement.innerHTML = `
				<div class="col s6 m3">
				  <div class="card p-10">
					<div class="row">
						<div class="col s12 card-image">
							<img src="${favorite.crestUrl}" alt="Gambar Club" class="circle responsive-image">
						</div>
					</div>
					<div>
					  <p class="center-align flow-text truncate">${favorite.shortName}</p>
					</div>
					<div class="right-align">
					  <a><i class="material-icons">delete</i></a>
					</div>
				  </div>
				</div>
				`;

			favoriteElement.querySelector("a").addEventListener("click", function() {
				deleteFavoriteTeam(favorite.id);
				favoritesElement.removeChild(favoriteElement);
			});

			favoritesElement.appendChild(favoriteElement);
		});
	}

	document.getElementById("favorites").appendChild(favoritesElement);
}

export { printTeams, printStandings, printMatches, printFavorites };
