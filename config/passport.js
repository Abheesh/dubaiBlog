// var passport = require('passport')
// var localStrategy = require('passport-local').Strategy;
const localStrategy = require('passport-local').Strategy;
const User = require('../model/userSchema');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {
    passport.use(new localStrategy(function (uname, password, done) {
        console.log('testing');
        let query = { uname: uname };
        User.findOne(query, function (err, userdata) {
            if (err) throw err;
            if (!userdata) {
                return done(null, false, { message: 'No user found' });
            }
            bcrypt.compare(password, userdata.password, function (err, ismatch) {
                if (err) throw err;
                if (ismatch) {
                    return done(null, userdata);
                } else {
                    return done(null, false, { message: 'Wrong password' });

                }
            })
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}