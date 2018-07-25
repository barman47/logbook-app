const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

let Student = require('../models/student');
let StudentRecord = require('../models/record');

router.get('/record', (req, res) => {
    res.render('studentRecord', {
        style: '/css/record.css',
        script: '/js/record.js'
    });
});

router.get('/register', (req, res) => {
    res.render('studentSignup', {
        title: 'e-Logbook Student Signup',
        style:  '/css/studentRegistration.css',
        script: '/js/studentSignup.js'
    });
});

router.post('/register', (req, res) => {
    const name = req.body.studentName;
    const department = req.body.department;
    const regNo = req.body.registrationNumber;
    const password = req.body.password;
 
    req.checkBody('studentName', 'Name is Required').notEmpty();
    req.checkBody('department', 'Department is Required').notEmpty();
    req.checkBody('registrationNumber', 'Registration Number is Required').notEmpty();
    req.checkBody('password', 'Password is Required').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('studentSignup', {
            title: 'e-Logbook Student Signup',
            style:  '/css/studentRegistration.css', 
            script: '/js/studentSignup.js',
            errors: errors
        }); 
        
    } else {
        let student = new Student ({
            name: name,
            department: department,
            regNo: regNo,
            password: password
        });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return console.log(err);
            }
            bcrypt.hash(student.password, salt, (err, hash) => {
                if (err) {
                    return console.log(err);
                }
                student.password = hash;
                student.save((err) => {
                    if (err) {
                        return console.log(err);
                    } else {
                        let studentRecord = new StudentRecord({
                            _id: mongoose.Types.ObjectId(student._id),
                            name: student.name,
                            department: student.department
                        });
                        studentRecord.save((err) => {
                            if (err) {
                                return console.log(err);
                            } else {
                                req.flash('success', 'Registration Successful. You can login now to use the App.');
                                res.redirect('/');     
                            }
                        });
                    }
                });
            });
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, student, info) => {
        if (err) {
            return next(err);
        }

        if (!student) {
            req.flash('failure', 'No Student found');
            return res.redirect('/');
        } 
        req.logIn(student, (err) => {
            let id = student._id;
            id = mongoose.Types.ObjectId(id);
            return res.redirect(`/students/studentRecord/${id}`);
        });
    })(req, res, next);
});

router.get('/studentRecord/:id', (req, res) => {
    StudentRecord.findById(req.params.id, (err, studentRecord) => {
        if (err) {
            throw err;
        } else {
            res.render('studentRecord', {
                title: 'Student e-Logbook',
                style: '/css/record.css',
                script: '/js/record.js',
                name: studentRecord.name,
                department: studentRecord.department,
                dataId: req.params.id
            });
        }
    });
});

router.put('/studentRecord/:id', (req, res) => {
    let record = {};
        record.monday =  req.body.mondayTextArea,
        record.tuesday = req.body.tuesdayTextArea,
        record.wednesday = req.body.wednesdayTextArea,
        record.thursday = req.body.thursdayTextArea,
        record.friday = req.body.fridayTextArea,
        record.week = req.body.week,
        record.weekJob = req.body.weekJob

    StudentRecord.findByIdAndUpdate(req.params.id, record, {new: true}, (err, updatedRecord) => {
        if (err) {
            throw err;
        }
        if (!updatedRecord) {
            return console.log('No record found');
        } else {
            res.send(updatedRecord);
        }      
    });
});

module.exports = router;