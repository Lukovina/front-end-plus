let fs = require('fs');
let path = './lections/lection_05_Gulp_npm_scripts/homework/numbers';
let name = "image_FR_01.png";
let envs = process.env
console.log(envs)
fs.readdir(path+'/images', function(err, items){
    if (err){
        console.log(err);
        return err;
    }

    console.log(items)
});