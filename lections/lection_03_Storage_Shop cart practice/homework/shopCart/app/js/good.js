let goods = document.querySelector(".goods")



function renderGood (element) {
    goods.innerHTML += `
    <div class="good">
        <div class="good-img" 
        style ="background-image: url('${element.img}');">
        </div>
        
    <p>${element.id}</p>
    <p>${element.title}</p>
    <p>${element.price}</p>
  
    <button id="${element.id}"> Add to card </button>
    
    </div>
     `
} 




module.exports = { 
    renderGood
};