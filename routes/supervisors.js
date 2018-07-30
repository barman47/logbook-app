const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

let Supervisor = require('../models/supervisor');
const path = require('path');
const publicPath = path.join(__dirname, '../../public/views');

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
                        req.flash('success', 'Supervisro Registration Successful. You can login now.');
                        res.redirect('/supervisors/login');
                    }
                });
            });
        });
    }
});

router.get('/login', (req, res) => {
    res.render('supervisorLogin', {
        title: 'Supervisor Signup',
        style: '/css/supervisorLogin.css',
        script: '/js/supervisorLogin.js'
    });
});

router.post('/login', (req, res, next) => {

    passport.authenticate('supervisor', (err, supervisor, info) => {
        if (err) {
            return next(err);
        }

        if (!supervisor) {
            req.flash('failure', 'Incorrect Username or Password');
            return res.redirect('/superviors/login');
        } 
        req.logIn(supervisor, (err) => {
            let id = supervisor._id;
            id = mongoose.Types.ObjectId(id);
            return res.redirect(`/supervisors/dashboard/${id}`);
        });
    })(req, res, next);
});

router.get('/dashboard/:id', (req, res) => {
    let id = req.params.id;
    let query = {_id: id};
    Supervisor.findOne(query, (err, supervisor) => {
        if (err) {
            res.status.send(500).send(err);
        }
        res.render('supervisorDashboard', {
            title: 'Supervisor Dashboard',
            style: '/css/supervisorDashboard.css',
            script: '/js/supervisorDashboard.js'
        });

    });
});

module.exports = router;