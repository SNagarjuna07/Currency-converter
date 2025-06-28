const BaseURL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json";

let selects = document.querySelectorAll(".dropdown select");

let btn = document.querySelector("#btn");

let fromCurr = document.querySelector(".from select");

let toCurr = document.querySelector(".to select");

let msg = document.querySelector(".msg");

let icon = document.querySelector("i");

for(let select of selects) {

    for(currCode in countryList) {

        let newOption = document.createElement("option");

        newOption.innerText = currCode;

        newOption.value = currCode;

        select.append(newOption);

        if(select.name === "from" && currCode === "USD")
            newOption.selected = true;

        if(select.name === "to" && currCode === "INR")
            newOption.selected = true;
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });

    
}

icon.addEventListener("click", () => {
    
    let temp = fromCurr.value;
    
    fromCurr.value = toCurr.value;

    toCurr.value = temp;

    updateFlag(fromCurr);

    updateFlag(toCurr);

    updateExchangeRate();

})

const updateFlag = (ele) => {
    let currCode = ele.value; // To get currency code [INR,USD]
    
    let countryCode = countryList[currCode];// To get country cde [IN,US]
    
    let img = ele.parentElement.querySelector("img");
    
    img.src = "https://flagsapi.com/" + countryCode + "/flat/64.png";;
}

btn.addEventListener("click", (e) => {
    e.preventDefault();

    updateExchangeRate();
})


const updateExchangeRate = async () => {
    let from = fromCurr.value.toLowerCase();

    let to = toCurr.value.toLowerCase();

    let amt = document.querySelector(".amount input");

    if(amt.value < 1) 
        amt.value = "1";

    const URL = "https://latest.currency-api.pages.dev/v1/currencies/"+ from + ".json";

    try {
    
        let response = await fetch(URL);

        let data = await response.json();

        let rate = data[from][to];
    
        msg.innerText = amt.value + " " + from.toUpperCase() + " = " + (rate * amt.value).toFixed(4) + " " + to.toUpperCase();
    
    } catch(e) {
        msg.innerText = "Can't get the rates. Try again later!";
    }
}

window.addEventListener("load", () => {
    updateExchangeRate();
})

