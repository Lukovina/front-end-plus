
let data   = require('./fetch.js'),
    render = require('./render.js')

let todayCurrencyInner   = document.querySelector(".currentDateCurrency"),
    archiveCurrencyInner = document.querySelector(".archiveDateCurrency"),
    archiveInput         = document.querySelector(".archiveInput"),
    diffValue            = document.querySelector(".diff_value")   

let currentCourse = "",
    archiveCourse = "",
    archiveDate   = "",
    difference    = "",
    currentDate = new Date().toLocaleDateString('en-GB').replace(/\//g, ".")

archiveInput.addEventListener('change', fillArchive)

function fillArchive() {
    Promise.resolve(setArchiveDate())
        .then(()=>data.load(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${archiveDate}`))
        .then(val=>{
            archiveCourse = val.exchangeRate.filter(item=>item.currency === "USD")[0].saleRateNB
            render.render(archiveCourse, archiveCurrencyInner, "USD")
        })
        .then(()=>{measureDifference(currentCourse, archiveCourse)})
        .then(()=>render.render(difference, diffValue, "%"))
}

function measureDifference (a,b) {
    difference = ((a*100)/b - 100).toFixed(2)
}

function setArchiveDate(){
    event.preventDefault()
    archiveDate = archiveInput.value.split("-").reverse().join(".")
}

data.load(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${currentDate}`)
.then(val=>{
    currentCourse = val.exchangeRate.filter(item=>item.currency === "USD")[0].saleRateNB
    render.render(currentCourse, todayCurrencyInner, "USD")
})     



