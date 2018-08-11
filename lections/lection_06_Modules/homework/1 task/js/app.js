let data   = require('./fetch.js'),
    render = require('./render.js')

let todayCurrencyInner   = document.querySelector(".currentDateCurrency"),
    archiveCurrencyInner = document.querySelector(".archiveDateCurrency"),
    archiveInput         = document.querySelector(".archiveInput"),
    archQuantityInput    = document.querySelector(".arch-quantity_input"),
    diffValue            = document.querySelector(".diff_value"),
    archiveList          = document.querySelector(".archTable")            

let currentCourse = "",
    archiveCourse = "",
    archiveDate   = "",
    archiveDates  = []  ,
    difference    = "",
    archiveArray  = [],
    arrayOfDidderencies,
    currentDate = new Date().toLocaleDateString('en-GB').replace(/\//g, "."),
    archiveQuantity

archiveInput.addEventListener('change', fillArchive)
archQuantityInput.addEventListener('change', fillDiffArchive)


function measureDifference (a,b) {

        if (a == b) {
            difference = 0
        }

        if(a>b) {
            difference = difference  = (((a / b) * 100)-100).toFixed(2)
        }else{
            difference = difference  = (100 - ((a / b) * 100)).toFixed(2)
        }

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

function setArchiveQuantity(){
    archiveQuantity = archQuantityInput.value;
}

function setArchiveDatesArray(){
    for(let i = 0, date = new Date(); i<archiveQuantity; i++){
        date.setDate(date.getDate() - 1)
        archiveDates.push(date.toLocaleDateString('en-GB').replace(/\//g, "."))
    }
    // archiveDates.unshift(currentDate)
}

async function fillDiffArchive(){
    setArchiveQuantity()
    setArchiveDatesArray()
    await getArchiveCurrencies(archiveDates)
    await getArrayOfDidderencies(archiveArray)
}

function getArchiveCurrencies(dates){
    archiveArray.push(currentCourse);
    
    dates.forEach(date => {
            Promise.resolve(date)
            .then(()=>data.load(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`))
            .then(val=>archiveArray.push(val.exchangeRate.filter(item=>item.currency === "USD")[0].saleRateNB))
            .then(()=> console.log(archiveArray))
        }) 
    
    // Promise.all(archiveArray)
    //     .then(val=>f)
}

function getArrayOfDidderencies(list) {
    console.log(list)
    list.reduce((prev, item)=> console.log("item" + item, "prev" + prev))
}


data.load(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
.then(val=>{
    currentCourse = val.filter(item=>item.ccy === "USD")[0].sale
    render.render(currentCourse, todayCurrencyInner, "USD")
})     



