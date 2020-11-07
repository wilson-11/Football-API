import { loadNav, loadPage } from "./nav.js";

function main() {
	document.addEventListener("DOMContentLoaded", () => {
		let sidenavElems = document.querySelectorAll(".sidenav");
		M.Sidenav.init(sidenavElems);

		let page = window.location.hash.substr(1);
		loadNav(page);
		if (page === "") page = "standing";
		loadPage(page);
	});
}

export { main };
