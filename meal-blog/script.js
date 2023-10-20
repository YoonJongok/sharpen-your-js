const input = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const searchResultContainer = document.querySelector(
	".search-result-container"
);
const mealDetailContainer = document.querySelector(".meal-detail");

// fetch random meal
// https://www.themealdb.com/api/json/v1/1/random.php

async function getMealById(mealId) {
	mealDetailContainer.innerHTML = "";

	try {
		const res = await fetch(
			`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`
		);
		const data = await res.json();
		const meal = data.meals[0];

		const foundMeal = {
			category: meal.strCategory,
			name: meal.strMeal,
			instruction: meal.strInstructions,
			thumbnail: meal.strMealThumb,
		};
		const img = document.createElement("img");
		const title = document.createElement("h2");
		const instruction = document.createElement("p");

		img.src = foundMeal.thumbnail;
		img.alt = foundMeal.name;
		title.innerText = foundMeal.name;
		instruction.innerText = foundMeal.instruction;

		mealDetailContainer.appendChild(img);
		mealDetailContainer.appendChild(title);
		mealDetailContainer.appendChild(instruction);
	} catch (error) {}
}

// Search by meal: Arrabiata
async function searchMeal(searchTerm) {
	let foundMeals = [];
	try {
		const res = await fetch(
			`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
		);
		const datas = await res.json();
		foundMeals = [
			...datas.meals.slice(0, 10).map((meal) => ({
				meal: meal.strMeal,
				thumbnail: meal.strMealThumb,
			})),
		];

		const html = foundMeals
			.map((meal) => {
				return `
		        <div class="meal">
		            <img src="${meal.thumbnail}" alt="${meal.meal}" />
                    <div class="blur"></div>
		            <h3>${meal.meal}</h3>
		        </div>
		    `;
			})
			.join("");
		searchResultContainer.innerHTML = html;
		const meals = document.querySelectorAll(".meal");
		if (meals) {
			meals.forEach((meal) => {
				meal.addEventListener("click", (e) => {
					const mealName = e.target.innerText;
					getMealById(mealName);
				});
			});
		}
	} catch (e) {
		console.log(e);
	}
}

searchBtn.addEventListener("click", () => searchMeal(input.value));
