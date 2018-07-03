let array = [
    function num1 (){return new Promise((resolve)=> setTimeout(()=> resolve(1),1000))},
    function num2 (){return new Promise((resolve)=> setTimeout(()=> resolve(2),1000))},
    function num3 (){return new Promise((resolve)=> setTimeout(()=> resolve(3),1000))},
    function num4 (){return new Promise((resolve)=> setTimeout(()=> resolve(4),1000))},
    function num5 (){return new Promise((resolve)=> setTimeout(()=> resolve(5),1000))},
    function num6 (){return new Promise((resolve)=> setTimeout(()=> resolve(6),1000))},
    function num7 (){return new Promise((resolve)=> setTimeout(()=> resolve(7),1000))}
]

async function runAsyncAll(list, async) {

   if(!async){
        let res = []
        for(let i of list) {
            res.push(await i())
        }
    return res
    }
        
    return  Promise.all(list.map(item=>item()))
}


runAsyncAll(array, false)
    .then(res=>console.log(res))