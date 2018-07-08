let dataService = require("./data.js")
let good = require("./good.js")

dataService.load("GET" , "http://localhost:3780/goods")
    .then(val => {
        dataService.model = val.data.list;
        val.data.list.forEach(el => good.renderGood(el))
    })
    .then(() => dataService.setAddButtons())

module.exports = { 

};