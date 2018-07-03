//task 1

// let list = [ { value: 10 }, { value: 12 }, { value: 3 },
//              { value: 31 }, { value: 19 }, { value: 6 },
//              { value: 24 }, { value: 11 }, { value: 2 }]

// list.sort(sortByNumber)  

// let sortedList = list.map( item => item.value ).filter(item=> item<=10 )

// function sortByNumber(a,b){
//     return a.value-b.value
// }

// console.log(sortedList)


//task2
class ViewController {
    constructor() {}
    get render () {
        return  `<div class = "container">
                    <div class = "row">
                        ${this.model.map(item=>
                            `<div class = "col s12 m6 l4">
                                <div class = "card ">
                                    <div class = "card-image">
                                    <img src = "${item.img}" >
                                    </div>
                                    <div class = "card-content">
                                        <p class = "card-title"> ${item.title}</p>
                                        <span>size: ${item.size}</span>
                                    </div>
                                </div>
                             </div>`
                        ).join("")}
                    </div>    
                </div>`
    }

    get sortBySize () {
        this.model.sort((a,b) => a.size-b.size)
        return this
    }    
    
    get sortByTitle () {
        this.model.sort(function(a, b) {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          })
        return this  
    }
}

var viewHolder = new ViewController();

fetch("js/goods.json")
    .then(function(response) {
        return (response.json());
        })
    .then(function(response){
        viewHolder.model = response
        document.body.innerHTML = viewHolder.sortByTitle.render 
    })




