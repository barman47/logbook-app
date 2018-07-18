const express = require('express');
const router = express.Router();

let Supervisor = require('../models/supervisor');
const path = require('path');
const publicPath = path.join(__dirname, '../../public/views');
let supervisor; 

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

router.get('/studentRecord', (req, res) => {
    res.render('studentRecord');
});

router.post('/register', (req, res) => {
    supervisor.name = req.body.supervisorName;
    supervisor.username = req.body.username;
    supervisor.password = req.body.password;

    supervisor.save((err) => {
        if (err) {
            return console.log(err);
        } else {
            res.redirect('/register');
        }
    });
});

module.exports = router;