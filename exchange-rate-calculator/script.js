const currencySelect1 = document.getElementById("curruncy-select1");
const input1 = document.getElementById("input1");
const currencySelect2 = document.getElementById("curruncy-select2");
const input2 = document.getElementById("input2");
const exchangeButton = document.getElementById("exchange-button");
const currencyRateParagraph = document.getElementById("currency-rate");

let currencyConfig = {
	currency: currencySelect1.value,
	amount: input1.value,
};

currencySelect1.addEventListener("change", (e) => {
	currencyConfig = {
		currency: e.target.value,
		amount: input1.value,
	};
});

function calculate() {
	fetch(`https://api.exchangerate-api.com/v4/latest/${currencyConfig.currency}`)
		.then((res) => res.json())
		.then((data) => {
			const rate = data["rates"][currencySelect2.value];
			currencyRateParagraph.innerText = `1 ${currencyConfig.currency} = ${rate} ${currencySelect2.value}`;
			input2.value = (rate * currencyConfig.amount).toFixed(2);
		});
}

exchangeButton.addEventListener("click", () => {
	calculate();
});
