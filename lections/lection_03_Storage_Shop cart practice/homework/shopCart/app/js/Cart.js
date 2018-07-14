let good = require('./good.js');

const cart = document.querySelector(".cart"),
      goodsTable = document.querySelector(".goodsTable"),
      cartButton = document.querySelector(".cartButton"),
      total = document.querySelector(".totalSum"),
      closer = document.querySelector(".close"); 


let goodsList = []

cartButton.addEventListener("click", cartRender);
closer.addEventListener("click", closeCart);


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

function totalSum(list){
    return list.map(key=>key.cartPrice).reduce((prev,item)=>prev+item,0)
   
}

function closeCart(){
    cart.classList.remove("show")
}

function removeGoodFromCart(ident) {
   let localStorageModer = []
   goodsList.forEach(item=>{if(item.id!=ident){localStorageModer.push(item)}})
   good.fillLocalStorage(localStorageModer)

  }

module.exports = { 
    cartRender,
    removeGoodFromCart
};