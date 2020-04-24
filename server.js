const express = require('express');
const connectDB = require('./config/db');

// for passport
require('dotenv').config();
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;
const User = require('./models/User');

const app = express();

connectDB();

app.use(express.json({ extended: false }));

// set express session
app.use(require("express-session")({
  secret: "Anything I want",
  resave: true,
  saveUninitialized: true,
//   cookie: {secure: true,
//     httpOnly: true,
//     maxAge: 1000 * 60 * 60 * 24
// }
}));

// pass current user to all routes
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
})

// TEST ROUTE
// get current session id
app.get('/id', (req, res) => {
  // res.send(req.sessionID);
  res.send(req.session.user);
})

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Strategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: '/api/auth/callback'
    },
    async function(accessToken, refreshToken, profile, cb){
      // runs when logging in
        let user = await User.findOne({ facebookID: profile.id });
        if(!user){
            console.log("new user");
            user = new User({
                facebookID: profile.id,
                name: profile.displayName,
                email: profile.email
            });
            await user.save();
            return cb(null, profile);
        }else{
            console.log("existing user");
            return cb(null, user);
        };
}));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Define routes
app.use('/api/auth', require('./routes/facebookAuth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/competitions', require('./routes/competitions'));
app.use('/api/purchases', require('./routes/competitions'));
app.use('/api/middleware', require('./routes/middleware'));

// home
app.get('/', (req, res) => {
    res.send("Success");
  });

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, 
    () => console.log(`Server started on port ${PORT}`)
);