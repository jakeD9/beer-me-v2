const router = require("express").Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// /api/all/x routes
router.route("/register")
    .get((req, res) => {
        res.send("Register acc");
    })
    .post((req, res) => {
        const { name, email, password, password2 } = req.body
        console.log(req.body)
        let errors = [];

        // validation
        // check required fields
        if (!name || !email || !password || !password2) {
            errors.push({
                msg: "Please fill in all fields"
            });
        }
        // check passwords match
        if (password !== password2) {
            errors.push({
                msg: "Passwords don't match"
            });
        }
        // check pass length
        if (password.length < 6) {
            errors.push({
                msg: "Password must be at least 6 characters"
            });
        }

        if (errors.length > 0) {
            console.log(errors)
            res.status(400).json(errors)
        } else {
            // validation is passed
            User.findOne({ email: email })
                .then(user => {
                    if (user) {
                        errors.push({
                            msg: "Email already in use"
                        })
                        res.status(400).json(errors)
                    } else {
                        const newUser = new User({
                            name,
                            email,
                            password
                        });

                        // hashing the password
                        bcrypt.genSalt(10, (err, salt) =>
                            bcrypt.hash(newUser.password, salt, (err, hash) => {
                                if (err) throw err;
                                // set password to hashed
                                newUser.password = hash
                                // save the user to mongo
                                newUser.save()
                                    .then(user => {
                                        res.status(200).json([{
                                            msg: "User created! Please log in"
                                        }])
                                    })
                                    .catch(err => console.log(err))
                            }))
                    }
                })
        }
    })
// login user
router.route("/login")
    .post((req, res, next) => {
        console.log(req.body);
        passport.authenticate('local', (err, user, info) => {
            if (err) { return next(err) }
            if (!user) { return res.sendStatus(401) }
            else { 
                req.login(user, (err) => {
                    console.log('Logged in ' + req.session.passport)
                    return res.sendStatus(200)
                })
 }
        })(req, res, next)
    })

// logout user
router.route("/logout")
    .get((req, res) => {
        req.logout();
        res.json("Logged out")
    })

router.route("/verify")
    .post((req, res) => {
        if(!req.user) return res.sendStatus(401)
        const userInfo = req.user
        const { email, _id, name } = userInfo
        console.log('User info ' + userInfo);
        return res.json({email, _id, name})
    })



module.exports = router;