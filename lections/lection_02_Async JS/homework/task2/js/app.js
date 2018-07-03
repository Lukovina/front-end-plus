var render = require('./render.js'),
    data = require('./data.js')

data.load("https://api.github.com/orgs/hillel-front-end")
    .then((data) => {
        viewController = new render.ViewController(data); 
        viewController.render()
    })


