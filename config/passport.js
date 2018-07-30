const LocalStrategy = require('passport-local').Strategy;
const Student = require('../models/student');
const Supervisor = require('../models/supervisor');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use('student', new LocalStrategy({
        usernameField: "regNo",
        passwordField: "password",
        passReqToCallback: true
      }, function verifyCallback(req, regNo, password, done) {
            Student.findOne({ regNo: regNo }, function(err, student) {
            if (err) return done(err);
            if (!student) {
                return done(null, false, {msg: 'No student found'});
            }
            bcrypt.compare(password, student.password, (err, isMatch) => {
                if (err) return done(err);
                if (!isMatch) {
                    return done(null, false, {msg: 'Incorrect Password'});
                } else {
                    return done(null, student);
                }
            });
        });
    }));

    passport.use('supervisor', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function verifyCallback (req, username, password, done) {
        Supervisor.findOne({username: username}, (err, supervisor) => {
            if (err) {
                return done (err);
            }

            if (!supervisor) {
                return done(null, false, {msg: 'No Supervisor found'});
            }
            bcrypt.compare(password, supervisor.password, (err, isMatch) => {
                if (err) {
                    return done(err);
                }
                if (!isMatch) {
                    return done (null, false, {msg: 'Incorrect Password'});
                } else {
                    return done(null, supervisor);
                }
            });
        });
    }));

    function sessionConstructor (userId, userGroup, details) {
        this.userId = userId;
        this.userroup = userGroup;
        this.details = details;
    }

    passport.serializeUser((userObject, done) => {
        let userGroup = Student;
        let userPrototype = Object.getPrototypeOf(userObject);

        if (userPrototype === Student.prototype) {
            userGroup = Student;
        } else if (userPrototype === Supervisor.prototype) {
            userGroup = Supervisor;
        }

        let sessionConstructor = new SessionConstructor(userObject.id, userGroup);
        done (null, sessionConstructor);
    });

    passport.deserializeUser((sessionConstructor, done) => {
        if (sessionConstructor.userGroup === Student) {
            Student.findOne({
                _id: sessionConstructor.userId,
            }, '-localStrategy.password', (err, student) => {
                done (err, user)
            });
        } else if (sessionConstructor.userGroup === Supervisor) {
            Supervisor.findOne({
                _id: sessionConstructor.userId
            }, '-localStrategy.password', (err, supervisor) => {
                done (err, supervisor);
            });
        }
    });
};

            // SINGLE-USER AUTHENTICATION//

// const LocalStrategy = require('passport-local').Strategy;
// const Student = require('../models/student');
// const bcrypt = require('bcryptjs');

// module.exports = (passport) => {
//     passport.use(new LocalStrategy({
//         usernameField: "regNo",
//         passwordField: "password",
//         passReqToCallback: true
//       }, function verifyCallback(req, regNo, password, done) {
//             Student.findOne({ regNo: regNo }, function(err, student) {
//             if (err) return done(err);
//             if (!student) {
//                 return done(null, false, {msg: 'No student found'});
//             }
//             bcrypt.compare(password, student.password, (err, isMatch) => {
//                 if (err) return done(err);
//                 if (!isMatch) {
//                     return done(null, false, {msg: 'Incorrect Password'})
//                 } else {
//                     return done(null, student);
//                 }
//             });
//         });
//     }));

//     passport.use();
  
//     passport.serializeUser((student, done) => {
//         done(null, student._id);
//     });
  
//     passport.deserializeUser((id, done) => {
//         Student.findById(id, (err, student) => {
//             done(err, student);
//         });
//     });
// };





