const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    week: {
        type: String,
    },

    monday: {
        type: String,
    },

    tuesday: {
        type: String,
    },

    wednesday: {
        type: String,
    },

    thursday: {
        type: String,
    },

    friday: {
        type: String,
    },

    saturday: {
        type: String,
    },

    department: {
        type: String
    },

    monday: {
        type: String,
    },

    weekJob: {
        type: String,
    },

    comment: {
        type: String,
    },

    supervisorName: {
        type: String
    },

    date: {
        type: String
    }

});

let  StudentRecord = module.exports = mongoose.model('StudentRecord', RecordSchema);