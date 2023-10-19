const URL = "https://randomuser.me/api";
const addButton = document.getElementById("add");
const doubleButton = document.getElementById("double");
const showMilliButton = document.getElementById("show-millionaires");
const sortButton = document.getElementById("sort");
const calculateWealthButton = document.getElementById("calculate-wealth");
const detailBodyContainer = document.getElementById("detail-body-container");
const body = document.querySelector("body");

let userList = [];

function formatMoney(number) {
	return "$" + number.toLocaleString();
}

async function fetchRandomUser() {
	try {
		const res = await fetch(URL);
		const data = await res.json();
		console.log(data);
		const userData = data.results[0];
		const user = {
			name: `${userData.name.first} ${userData.name.last}`,
			account: Math.floor(Math.random() * 1000000),
		};

		userList.push(user);
		updateDOM();
	} catch (error) {
		console.log(error);
	}
}

function updateDOM(providedData = userList) {
	resetTotalWealth();

	detailBodyContainer.innerHTML = "";
	console.log(detailBodyContainer);
	providedData.forEach((user) => {
		const wrapper = document.createElement("div");
		const nameEl = document.createElement("h3");
		const accountEl = document.createElement("p");

		nameEl.innerText = user.name;
		accountEl.innerText = formatMoney(user.account);

		wrapper.appendChild(nameEl);
		wrapper.appendChild(accountEl);
		detailBodyContainer.appendChild(wrapper);
	});
}

function doubleMoney() {
	userList = userList.map((user) => {
		return { ...user, account: user.account * 2 };
	});
	updateDOM();
}

function sortMillionaires() {
	userList = userList.filter((user) => user.account > 1000000);
	updateDOM();
}

function sortByRichest() {
	userList.sort((a, b) => b.account - a.account);
	updateDOM();
}

function resetTotalWealth() {
	const existingWealthEl = document.getElementById("wealth");
	if (existingWealthEl) {
		existingWealthEl.remove();
	}
}

function calculateEntireWealth() {
	resetTotalWealth();

	const totalWealth = userList.reduce((acc, curr) => {
		return acc + curr.account;
	}, 0);
	const wealthEl = document.createElement("div");
	wealthEl.setAttribute("id", "wealth");
	wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
		totalWealth
	)}</strong></h3>`;
	body.appendChild(wealthEl);
}

addButton.addEventListener("click", fetchRandomUser);
doubleButton.addEventListener("click", doubleMoney);
showMilliButton.addEventListener("click", sortMillionaires);
sortButton.addEventListener("click", sortByRichest);
calculateWealthButton.addEventListener("click", calculateEntireWealth);

fetchRandomUser();
fetchRandomUser();
fetchRandomUser();
