let fs = require('fs');
let path = './lections/lection_05_Gulp_npm_scripts/homework/languages';
let all = {}
fs.readdir(path+'/languages', function(err, items){
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
});
