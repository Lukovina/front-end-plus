let goodL = require("./good.js")
let data = require("./data.js")
let dataBases = require("./dataBases.js")

const cart = document.querySelector(".cart"),
      goodsTable = document.querySelector(".goodsTable"),
      cartButton = document.querySelector(".cartButton"),
      total = document.querySelector(".totalSum"),
      closer = document.querySelector(".close"),
      order = document.querySelector(".order"),
      clearCart = document.querySelector(".clear"); 


let goodsList = []

cartButton.addEventListener("click", cartRender);
closer.addEventListener("click", closeCart);
order.addEventListener("click", sendOrder);
clearCart.addEventListener("click", clear_Cart)


function cartRender () {
    cart.classList.add("show");
    goodsList = JSON.parse(localStorage.getItem("goods")) ;

    goodsTable.innerHTML = ""

    if(!goodsList) {
        goodsTable.innerHTML = "Корзина пуста"
        return
    }
    goodsList.forEach(good => {
       goodsTable.innerHTML+= 
       `<tr>
            <td colspan="3">${good.title}</td>
            <td>${good.price}$/кг</td>
            <td><input type="number" value="${good.quantity}"></td>
            <td><div class="close removeGood" id="${good.id}"></div></td>
            <td>${good.cartPrice}$</td>
        </tr>`
    })
    total.innerHTML = `total Sum: ${totalSum(goodsList)} $`

    let removeGood = document.querySelectorAll(`.removeGood`);   
        removeGood.forEach(item=>item.addEventListener("click", function(){removeGoodFromCart(item.id)}))            
}

function clear_Cart() {
    
    goodL.localStorageModel.forEach(item=>{
        item.quantity = 0;
        item.cartPrice = 0
        }
    )
    goodL.localStorageModel = ""

    goodL.fillLocalStorage(goodL.localStorageModel)
    cartRender()
}

function totalSum(list){
    return list.map(key=>key.cartPrice).reduce((prev,item)=>prev+item,0)
   
}

function closeCart(){
    cart.classList.remove("show")
}

function removeGoodFromCart(ident) {
    goodL.localStorageModel.forEach(item=>{
        if(item.id == ident) {
            item.quantity = 0;
        }
    })
    console.log(goodL.localStorageModel.filter(item=>item.id!=ident))
   goodL.fillLocalStorage(goodL.localStorageModel.filter(item=>item.id!=ident))
   
   cartRender()
  }


  function sendOrder(){
    data.load("POST", "http://localhost:3780/order")
    .then(val=>console.log(val))
  }

module.exports = { 
    cartRender,
    removeGoodFromCart
};