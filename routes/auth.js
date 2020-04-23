const express = require('express');
const router = express.Router();
require('dotenv').config();
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

const User = require('../models/User');

// passport
router.use(passport.initialize());
router.use(passport.session());
passport.use(new Strategy({
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: '/api/auth/callback'
    },
    async function(accessToken, refreshToken, profile, cb){
        let user = await User.findOne({ email: profile.email });
        if(!user){
            user = new User({
                name: profile.displayName,
                email: profile.email,
                password: 'testing'
            });
            await user.save();
            return cb(null, profile);
        }else{
            return cb(null, user);
        };
}));
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// after authenticating
router.get('/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// log in
router.get('/login/facebook',
  passport.authenticate('facebook')

);





module.exports = router;