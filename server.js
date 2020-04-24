const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

connectDB();
const User = require('./models/User');

app.use(express.json({ extended: false }));

// set express session
app.use(require("express-session")({
  secret: "Anything I want",
  resave: true,
  saveUninitialized: true
}));


// Passport
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

// Facebook Passport Strategy
const Strategy = require('passport-facebook').Strategy;
passport.use(new Strategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: '/api/fbauth/callback'
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
app.use('/api/fbauth', require('./routes/facebookAuth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/competitions', require('./routes/competitions'));
app.use('/api/purchases', require('./routes/competitions'));
app.use('/api/middleware', require('./routes/middleware'));

const PORT = process.env.PORT || 5000;
app.listen(
    PORT, 
    () => console.log(`Server started on port ${PORT}`)
);