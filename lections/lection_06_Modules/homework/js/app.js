let data = require('./fetch.js');

data.load("https://api.privatbank.ua/p24api/exchange_rates?json&date=01.12.2014")
     .then(val=>console.log(val))
