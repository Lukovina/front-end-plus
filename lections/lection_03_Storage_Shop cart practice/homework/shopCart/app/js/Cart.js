let data = require("./data.js");

const cartGoods = new Set();

function fillCart(ident) {   
    for(let item of data.initialCondition()) {
        for(let key in item) {
            if(item[key] == ident) {
                cartGoods.add(item)
            }
        }
    }

    localStorage.setItem("goods" , JSON.stringify([...cartGoods]))
}

module.exports = { 
    fillCart
};