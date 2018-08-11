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
    arrayOfDifferencies = [],
    archiveQuantity = 0


data.load(`https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5`)
.then(val=>{
    currentCourse = val.filter(item=>item.ccy === "USD")[0].sale
    render.render(currentCourse, todayCurrencyInner, "USD")
})     

archiveInput.addEventListener('change', fillArchive)
archQuantityInput.addEventListener('change', fillDiffArchive)

function fillDiffArchive(){
    setArchiveQuantity()
    setArchiveDatesArray()
    getArchiveCurrencies(archiveDates)
}

function measureDifference (a,b) {
        let res = 0
     
        if (a == b) {
            return res
        }

        if(a>b) {
            res = (((a / b) * 100)-100).toFixed(2)
        }else{
            res = (100 - ((a / b) * 100)).toFixed(2)
        }
       
        return res
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
        .then(()=>measureDifference(currentCourse, archiveCourse))
        .then((diff)=>render.render(diff, diffValue, "%")
    )
}

function setArchiveQuantity(){
    archiveQuantity = archQuantityInput.value;
}

function setArchiveDatesArray(){
    for(let i = 0, date = new Date(); i<archiveQuantity; i++){
        date.setDate(date.getDate() - 1)
        archiveDates.push(date.toLocaleDateString('en-GB').replace(/\//g, "."))
    }
    
}

function getArchiveCurrencies(dates){
    
    archiveDates = dates.map(date=>
                Promise.resolve(date)
                    .then(()=>data.load(`https://api.privatbank.ua/p24api/exchange_rates?json&date=${date}`))
                    .then((item)=>item.exchangeRate.filter(item=>item.currency === "USD")[0].saleRateNB)   
                )

    Promise.all(archiveDates)
           .then(val=>{
                val.unshift(+currentCourse);
                getArrayOfDidderencies(val);
                render.archRender(val, arrayOfDifferencies, archiveList, "UAH")

           })

}

function getArrayOfDidderencies(list) {

    for (let i = 0; i<list.length;i++) {
        arrayOfDifferencies.push(measureDifference(list[i], list[i+1]))
    }

}



