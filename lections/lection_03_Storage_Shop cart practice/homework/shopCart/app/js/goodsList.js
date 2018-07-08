let data = require("./data.js")
let good = require("./good.js")

data.load("GET" , "http://localhost:3780/goods")
    .then(val => val.data.list.forEach(el => good.renderGood(el)))



module.exports = { 

};