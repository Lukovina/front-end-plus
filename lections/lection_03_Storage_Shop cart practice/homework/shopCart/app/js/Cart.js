let data = require("./data.js");
const cart = document.querySelector(".cart"),
      goodsTable = document.querySelector(".goodsTable"),
      cartButton = document.querySelector(".cartButton"),
      closer = document.querySelector(".close"); 

cartButton.addEventListener("click", cartRender);
closer.addEventListener("click", closeCart);
console.dir(closer)

const cartGoods = [];
function fillCart(ident) {   
    for(let item of data.initialCondition()) {
        for(let key in item) {
            if(item[key] == ident) {
                cartGoods.push(item)
            }
        }
    }

    localStorage.setItem("goods" , JSON.stringify(cartGoods))
}

function cartRender () {
    cart.classList.add("show")
    let goodsList = JSON.parse(localStorage.getItem("goods")) 
    goodsTable.innerHTML += `
            ${goodsList.map(good => 
                `<tr>
                    <td>${good.title}</td>`
            ).join("")}
            </tr>
        </table>
    `              
}


function closeCart(){
    console.log("ss")
    cart.classList.remove("show")
}

module.exports = { 
    fillCart
};