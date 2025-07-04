const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies"
const dropdowns = document.querySelectorAll(".dropdown select")
const button = document.querySelector("#button")
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected"
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    }

    select.addEventListener("change", () => {
        updateFlag(select);
    });

    new Choices(select, {
        searchEnabled: true,
        itemSelectText: "",
    });
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`
    let selectType = element.dataset.select;
    document.querySelector(`img[data-flag="${selectType}"]`).src = newSrc;
}

button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amount.value = "";
        alert("Please enter the valid input")
    }

    if (amtValue >= 1) {
        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data[fromCurr.value.toLowerCase()];
        let newRate = rate[toCurr.value.toLowerCase()];
        let conveteredVal = amtValue * newRate
        msg.innerText = `${amtValue} ${fromCurr.value} = ${conveteredVal.toFixed(2)} ${toCurr.value}`;
    }
})
