const mongoose = require('mongoose');
const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    department: {
        type: String,
        required: true,
    },

    regNo: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    school: {
        type: String
    }
});

let Student = module.exports = mongoose.model('Student', StudentSchema);
