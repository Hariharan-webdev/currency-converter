var fromCurrency = document.getElementById("from-currency");
var toCurrency = document.getElementById("to-currency");
var convertButton = document.getElementById("convert-button");
var resultText = document.getElementById("result-text");

async function fetchCurrencies() {
  try {
    const response = await fetch("https://api.frankfurter.app/currencies");
    const data = await response.json();
    populateCurrencyOptions(data);
  } catch (error) {
    console.error("Error fetching currency data:", error);
  }
}

function populateCurrencyOptions(currencies) {
  for (const currency in currencies) {
    const optionFrom = document.createElement("option");
    optionFrom.value = currency;
    optionFrom.text = currency;
    fromCurrency.add(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = currency;
    optionTo.text = currency;
    toCurrency.add(optionTo);
  }
}

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (amount === "" || isNaN(amount)) {
    resultText.textContent = "Please enter a valid amount.";
    return;
  }

  if (from === to) {
    resultText.textContent = "Please choose a different currencies.";
    return;
  }

  try {
    const response = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
    );
    const data = await response.json();
    const convertedAmount = data.rates[to];
    resultText.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
  } catch (error) {
    console.error("Error converting currency:", error);
    resultText.textContent = "Error converting currency.";
  }
}

fetchCurrencies();

convertButton.addEventListener("click", convertCurrency);