const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

let Supervisor = require('../models/supervisor');
const path = require('path');
const publicPath = path.join(__dirname, '../../public/views');

router.get('/login', (req, res) => {
    res.render('supervisorLogin', {
        title: 'Supervisor Signup',
        style: '/css/supervisorLogin.css',
        script: '/js/supervisorLogin.js'
    });
});

router.get('/register', (req, res) => {
    res.render('supervisorSignup', {
        title: 'Supervisor Signup',
        style: '/css/supervisorRegistration.css',
        script: '/js/supervisorSignup.js'
    });
});

router.post('/register', (req, res) => {
    let body = req.body;
    let name = body.supervisorName;
    let username = body.username;
    let password = body.password;
    
    req.checkBody('supervisorName', 'Name is required').notEmpty();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        console.log(errors);
        res.render('supervisorSignup', {
            title: 'Supervisor Signup',
            style: '/css/supervisorRegistration.css',
            script: '/js/supervisorSignup.js',
            errors: errors
        });
    } else {
        let supervisor = new Supervisor({
            name: name,
            username: username,
            password: password
        });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return console.log(err);
            }

            bcrypt.hash(supervisor.password, salt, (err, hash) => {
                if (err) {
                    return console.log(err);
                }

                supervisor.password = hash;
                supervisor.save((err) => {
                    if (err) {
                        return console.log(err);
                    } else {
                        req.flash('success', 'Registration Successful. You can login now.');
                        res.redirect('/supervisors/login');
                    }
                });
            });
        });
    }
});

router.get('/studentRecord', (req, res) => {
    res.render('studentRecord');
});

module.exports = router;