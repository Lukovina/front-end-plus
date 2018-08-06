let gulp = require('gulp'),
    fs   = require('fs'),
    all = {}

// gulp.task("getNames", ()=>
// fs.readdir('./languages', function(err, items){
//     if (err){
//         console.log(err);
//         return err;
//     }
//     items.forEach(item => {
//       let lang = require("./languages/"+item)
//       let key = item.slice(item.indexOf("_")+1, item.indexOf(".js"))
//       all[key] = lang;
//       console.log(all)
//     })
// })
// )

gulp.task('getLang',()=>
    gulp.src('./languages/*.json')
    .on('data', (file)=>{
        console.log(file.value)
        // let lang = JSON.parse(file)
        // let key = item.slice(item.indexOf("_")+1, item.indexOf(".js"))
        // all[key] = lang;
        // console.log(lang)
        // console.log(all) 
    }
    
)
)