const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student');
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    //Local Startegy
    passport.use(new LocalStrategy((regNo, password, done) => {
        //Match RegNo
        let query = {regNo: regNo};
        Student.findOne(query, (err, student) => {
            if (err)  throw err; 
            if (!student) {
                return done(null, false, {message: 'No Student found'});
            }

            //Match password
            bcrypt.compare(password, student.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, student);
                } else {
                    return done(null, false, {message: 'Wrong Password'});
                }
            });
        });
    }));

    passport.serializeUser(function(student, done) {
        done(null, student.id);
    });
      
    passport.deserializeUser(function(id, done) {
        Student.findById(id, function(err, student) {
            done(err, student);
        });
    });
};