let gulp = require('gulp'),
    fs   = require('fs'),
    path = './lections/lection_05_Gulp_npm_scripts/homework/rename_language_Gulp',
    all = {}

gulp.task("getNames", ()=>
fs.readdir('./languages', function(err, items){
    if (err){
        console.log(err);
        return err;
    }
    items.forEach(item => {
      let lang = require("./languages/"+item)
      let key = item.slice(item.indexOf("_")+1, item.indexOf(".js"))
      all[key] = lang;
      console.log(all)
    })
})
)