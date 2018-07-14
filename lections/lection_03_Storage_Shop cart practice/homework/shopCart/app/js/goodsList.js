let dataService = require("./data.js")
let good = require("./good.js")
let cart = require("./cart.js")

dataService.load("GET" , "http://localhost:3780/goods")
    .then(val => {val.data.list.forEach(el => good.renderGood(el))})
    .then(() => good.addButtons())


    
module.exports = { 

};