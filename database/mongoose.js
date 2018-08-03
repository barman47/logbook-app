const mongoose = require('mongoose');
const uri = 'mongodb://barman47:vicecity47@ds111492.mlab.com:11492/logbookapp';

mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true
});
console.log('Connected to Mongo Database on mongodb://localhost:27017/LogbookApp');

module.exports = {mongoose};