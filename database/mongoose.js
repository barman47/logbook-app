const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://barman47:VICEcity@47@ds111562.mlab.com:11562/heroku_2110v6rs', {
    useNewUrlParser: true
});

console.log('Connected to Mongo Database on mongodb://localhost:27017/LogbookApp');

module.exports = {mongoose};