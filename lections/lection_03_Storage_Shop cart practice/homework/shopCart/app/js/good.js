let data = require("./data.js");

let goods = document.querySelector(".goods"),
    list
data.load("GET" , "http://localhost:3780/goods")
    .then(val=> list = val.data.list)

let localStorageModel = JSON.parse(localStorage.getItem("goods")) || []    
debugger;
function renderGood (element) {
    goods.innerHTML += `
    <div class="good">
        <div class="good-img" 
            style ="background-image: url('${element.img}')">
        <div class="good_elements">
        <div class="good_elements-info">
            <p class="good_cart-title">${element.title}</p>
            <p class="good_cart-price">Price: ${element.price}$</p>
        </div>    
            <button class="good_cart-addBtn" id="${element.id}"> Add to card </button> 
        </div>  
        </div>
    </div>
     `
} 

function addButtons() {
    let addBtns = document.querySelectorAll(".good button");
    addBtns.forEach(elem=> elem.addEventListener("click", ()=>sendToСard(elem.id)))
}

function sendToСard(ident) { 
    list.forEach(item=>{
        if(item.id == ident) {
            item.quantity+=1;
            item.cartPrice = item.price*item.quantity
            if(localStorageModel.indexOf(item)<0){
                localStorageModel.push(item)
            }
        }
    })
    fillLocalStorage(localStorageModel)
}

function fillLocalStorage(model){
    localStorage.setItem("goods", JSON.stringify(model))
}

module.exports = { 
    renderGood,
    sendToСard,
    addButtons,
    localStorageModel,
    fillLocalStorage
};