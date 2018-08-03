const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/logbookApp', {
//     useNewUrlParser: true
// });

mongoose.connect('mongodb://barman:VICEcity47@ds113122.mlab.com:13122/logbookapp', {
    useNewUrlParser: true
});
console.log('Connected to Mongo Database on mongodb://localhost:27017/LogbookApp');



module.exports = {mongoose};

