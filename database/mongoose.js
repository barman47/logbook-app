const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/logbookApp', {
//     useNewUrlParser: true
// });

mongoose.connect('mongodb://barman47:VICEcity47@ds111492.mlab.com:11492/logbookapp', {
    useNewUrlParser: true
});
console.log('Connected to Mongo Database on mongodb://localhost:27017/LogbookApp');



module.exports = {mongoose};

