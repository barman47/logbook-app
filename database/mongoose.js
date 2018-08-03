const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://barman47:VICEcity%4047@ds111492.mlab.com:11492/logbookapp', {
//     useNewUrlParser: true
// });

mongoClient.connect('mongodb://barman47:VICEcity@47@ds111492.mlab.com:11492/logbookapp', { 
    uri_decode_auth: true,
    useNewUrlParser: true 
    }, function(err, db) {

    }
);

console.log('Connected to Mongo Database on mongodb://localhost:27017/LogbookApp');

module.exports = {mongoose};