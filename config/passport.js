const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// load user model
const User = require('../models/User');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            // match user
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        console.log("Email not registered")
                        return done(null, false, { message: 'Email not registered' });
                    }

                    // match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        console.log(password)
                        console.log(user.password)
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            console.log("Password incorrect")
                            return done(null, false, { message: 'Password incorrect' })
                        }
                    })
                })
                .catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}
