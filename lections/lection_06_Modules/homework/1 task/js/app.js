let data   = require('./fetch.js'),
    render = require('./render.js')

let todayCurrencyInner   = document.querySelector(".currentDateCurrency"),
    archiveCurrencyInner = document.querySelector(".archiveDateCurrency"),
    archiveInput         = document.querySelector(".archiveInput"),
    archQuantityInput    = document.querySelector(".arch-quantity_input"),
    diffValue            = document.querySelector(".diff_value"),
    archiveList         = document.querySelector(".archTable")            

let currentCourse = "",
    archiveCourse = "",
    archiveDate   = "",
    difference    = "",
    archiveArray  = [],
    currentDate = new Date().toLocaleDateString('en-GB').replace(/\//g, "."),
    archiveQuantity

archiveInput.addEventListener('change', fillArchive)
archQuantityInput.addEventListener('change', fillDiffArchive)


function measureDifference (a,b) {
    difference = (((a / b) * 100)-100).toFixed(2)
}

function setArchiveDate(){
    event.preventDefault()
    archiveDate = archiveInput.value.split("-").reverse().join(".")
}

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

function fillDiffArchive(){
    setArchiveQuantity()
    setArchiveArray()
    render.archRender(currentCourse, archiveArray, archiveList)
}

function setArchiveQuantity(){
    archiveQuantity = archQuantityInput.value;
    console.log(archiveQuantity)
}

function setArchiveArray(){
    for(let i = 0, date = new Date(); i<archiveQuantity; i++){
        date.setDate(date.getDate() - 1)
        archiveArray.push(date.toLocaleDateString('en-GB').replace(/\//g, "."))
    }
}

data.load(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${currentDate}`)
.then(val=>{
    currentCourse = val.exchangeRate.filter(item=>item.currency === "USD")[0].saleRateNB
    render.render(currentCourse, todayCurrencyInner, "USD")
})     



