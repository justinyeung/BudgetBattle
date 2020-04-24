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

// callback
router.get('/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // returns logged in user
    // return res.json(req.user);

    // save user to express session
    req.session.user = req.user;

    // redirect to home page
    res.redirect('http://localhost:3000/');
});

// @route GET /api/fbauth/login
// @desc log in to facebook route
// @access public
router.get('/login',
  passport.authenticate('facebook')
);

// @route GET /api/fbauth/user
// @desc log in to facebook route
// @access private
router.get('/user', (req, res) => {
  res.json(req.session.user);
})

module.exports = router;