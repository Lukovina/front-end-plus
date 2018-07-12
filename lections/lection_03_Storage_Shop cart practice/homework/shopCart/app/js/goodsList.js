let dataService = require("./data.js")
let good = require("./good.js")
let cart = require("./cart.js")

dataService.load("GET" , "http://localhost:3780/goods")
    .then(val => {val.data.list.forEach(el => good.renderGood(el))})
    .then(() => addButtons(".good button", cart.fillCart))

function addButtons(selector, func, params) {
    let addBtns = document.querySelectorAll(selector);
    addBtns.forEach(elem=> elem.addEventListener("click", () => func(elem.id)))
}
    
module.exports = { 
    addButtons
};