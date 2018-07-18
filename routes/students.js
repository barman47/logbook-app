const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

let Student = require('../models/student');
let StudentRecord = require('../models/record');

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
    req.checkBody('password', 'password is Required').notEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if (errors) {
        res.render('studentSignup', {
            errors: errors,
            title: 'e-Logbook Student Signup',
            style:  '/css/studentRegistration.css',
            script: '/js/studentSignup.js'
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
                            _id: student._id
                        });
                        studentRecord.save((err) => {
                            if (err) {
                                return console.log(err);
                            } else {
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
    passport.authenticate('local', {
        successRedirect: '/students/studentRecord',
        failureRedirect: '/'
    })(req, res, next);
    let student = new Student();
    let studentRecord = new StudentRecord();

    let studentQuery = {
        regNo: req.body.regNo,
        password: req.body.password
    };


    // student.findOne(studentQuery, (err, student) => {
    //     if (err) {
    //         return console.log(err);
    //     } else {
    //         let recordQuery = {
    //             _id: student._id
    //         };
    //         studentRecord.findOne(recordQuery, (err, studentRecord) => {
    //             if (err) {
    //                 return console.log(err);
    //             } else {
    //                 res.render('/students/studentRecord');
    //             }
    //         });
    //     }
    // });

    // student.findOne({
    //     regNo: req.body.regNo,
    //     password: req.body.password
    // }, (err, student) => {
    //     if (err) {
    //         return console.log(err);
    //     } else {
    //         if (!student) {
    //             return console.log('User name and password are incorrect');
    //         }

    //         res.send(student);
    //     }
    // });
    
});

// router.get('/studentRecord/:id', (req, res) => {
//     let student = new Student();
//     let studentRecord = new StudentRecord();

//     let studentQuery = {};
//     student.findOne();
//     res.render('studentRecord', {
//         title: 'Student e-Logbook',
//         studentName: ,
//         mode: ,
//         department: ,
//         weekJob,

//     });
// });

router.get('/studentRecord/update', (req, res) => {
    res.render('studentRecord');
});


module.exports = router;