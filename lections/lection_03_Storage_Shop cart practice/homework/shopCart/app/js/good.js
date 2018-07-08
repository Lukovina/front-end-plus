let goods = document.querySelector(".goods")



function renderGood (element) {
    goods.innerHTML += `
    <div class="good id-${element.id}">
        <div class="good-img" 
        style ="background-image: url('${element.img}');">
        </div>
        
    <span>${element.id}</span>
    <span>${element.title}</span>
    <span>${element.price}</span>
  
    
    <button class="addBtn"> Add to card </button>
    
    </div>
     `

    var addBtn = document.querySelector(`.good.id-${element.id} button`);
    addBtn.addEventListener("click", function(){
        localStorage.setItem("ss", "ss")
        console.log("1ß")})
} 




module.exports = { 
    renderGood
};