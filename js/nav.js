let page;

function loadNav() {
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status !== 200) return;

			document.querySelectorAll(".topnav, .sidenav")
				.forEach((elm) => {
					elm.innerHTML = xhttp.responseText;
				});

			document.querySelectorAll(".sidenav a, .topnav a")
				.forEach((elm) => {
					elm.addEventListener("click", (event) => {
						let sidenav = document.querySelector(".sidenav");
						M.Sidenav.getInstance(sidenav).close();

						page = event.target.getAttribute("href").substr(1);
						loadPage(page);
					});
				});
		}
	};
	xhttp.open("GET", "nav.html", true);
	xhttp.send();
}

function showPreloader() {
	document.getElementById("preloader").style.display = "block";
	document.querySelector("#body-content").style.display = "none";
}

function hidePreloader() {
	setTimeout(() => {
		document.getElementById("preloader").style.display = "none";
	}, 1000);
	document.querySelector("#body-content").style.display = "block";
}

function loadPage(page) {
	showPreloader();
	let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			let content = document.querySelector("#body-content");

			if(page === "team") {
				getTeams();
			} else if(page === "favorite") {
				getFavorites();
			} else if(page === "standing") {
				getStandings();
			}

			if (this.status === 200) {
				content.innerHTML = xhttp.responseText;
			} else if (this.status === 404) {
				content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
			} else {
				content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
			}

			if(page === "match") {
				let selectElems = document.querySelectorAll("select");
				M.FormSelect.init(selectElems);
			}

			hidePreloader();
		}
	};
	xhttp.open("GET", "pages/" + page + ".html", true);
	xhttp.send();
}

document.addEventListener("DOMContentLoaded", () => {
	let sidenavElems = document.querySelectorAll(".sidenav");
	M.Sidenav.init(sidenavElems);

	page = window.location.hash.substr(1);
	loadNav();
	if (page === "") page = "standing";
	loadPage(page);
});
