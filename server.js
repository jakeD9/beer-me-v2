const express = require('express');
const routes = require("./routes");
const mongoose = require("mongoose");
const db = require('./config/keys').MongoURI;
// const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport)

// connect to DB
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err))

const app = express();
const PORT = process.env.port || 3030;

// base middleware to parse requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors settings
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// express session middleware
app.use(session({
    secret: 'secretbeer',
    resave: true,
    saveUninitialized: true
}))

// passport
app.use(passport.initialize());
app.use(passport.session());





// routes
app.use(routes)

app.listen(PORT, console.log(
    `Server running on port ${PORT}`
))