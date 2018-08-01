let fs = require('fs');
let path = './lections/lection_05_Gulp_npm_scripts/homework/numbers';
let name = "image_FR_";
let envs = JSON.parse(process.env.env);
let i = 0;
console.log(envs)
fs.readdir(path+'/images', function(err, items){
    if (err){
        console.log(err);
        return err;
    }

    console.log(items)
    
    items.forEach(item=>{
        fs.rename(path + '/images/' +item, path + '/images/'+ name + envs[i] +`.png`, (err) => {
           
            if (err) throw err;
            console.log('Rename complete!');            
        })
        i++
    })
})