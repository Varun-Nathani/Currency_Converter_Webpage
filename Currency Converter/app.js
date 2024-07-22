const baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let actualURL

let exchangeRate
let amount
let message

let flagCountryCode

let fromCurr
let toCurr

const dropdowns = document.querySelectorAll(".dropdown select")

const dropdownImgs = document.querySelectorAll(".select-container img")

let finalOutput = document.querySelector(".msg")

let btn = document.querySelector("button")

for (select of dropdowns){
    AddAllCountries();
}

dropdowns[0].addEventListener("change", (evt) => {
    flagCountryCode = dropdowns[0].value
    UpdateFlag(evt.target)
    for (curr in countryList){
        if (countryList[curr] === flagCountryCode){
            fromCurr = curr.toLowerCase()
        }
    }
} )

dropdowns[1].addEventListener("change", (evt) => {
    flagCountryCode = dropdowns[1].value
    UpdateFlag(evt.target)
    for (curr in countryList){
        if (countryList[curr] === flagCountryCode){
            toCurr = curr.toLowerCase()
        }
    }
} )


btn.addEventListener("click", (evt) => {
    evt.preventDefault()
    let amountElement = document.querySelector(".amount input")
    amount = amountElement.value

    if (amount === "" || amount <=0 ){
        amountElement.value = 1
        amount = amountElement.value
    }
    FetchData()
})



async function FetchData(){
    actualURL = `${baseURL}/${fromCurr}.json` 
    let response = await fetch(actualURL)
    let obj = await response.json()
    exchangeRate = obj[fromCurr][toCurr]
    message = `${amount} ${fromCurr.toUpperCase()} = ${amount * exchangeRate} ${toCurr.toUpperCase()} as of ${obj.date}`
    finalOutput.textContent = message
}

function AddAllCountries(){
    for(currency in countryList){
        let newOption = document.createElement("option")
        let sign
        for (symbol in currencySybmols){
            if (symbol === currency){
                sign = currencySybmols[symbol]
            }
            newOption.innerText =  `${currency}, ${sign}`
            newOption.value = countryList[currency]
        }
        select.appendChild(newOption)
        if((currency === "INR" && select.name === "to") || currency === "USD" && select.name === "from"){
            newOption.selected = true
            fromCurr = "usd"
            toCurr = "inr"
        }
    }

}

function UpdateFlag(element){
    element.parentElement.childNodes[1].src = `https://flagsapi.com/${flagCountryCode}/flat/64.png` 
}