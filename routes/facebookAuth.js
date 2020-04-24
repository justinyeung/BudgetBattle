const express = require('express');
const router = express.Router();
require('dotenv').config();
const passport = require('passport');
const Strategy = require('passport-facebook').Strategy;

const User = require('../models/User');

// passport
// router.use(passport.initialize());
// router.use(passport.session());
// passport.use(new Strategy({
//     clientID: process.env['FACEBOOK_APP_ID'],
//     clientSecret: process.env['FACEBOOK_APP_SECRET'],
//     callbackURL: '/api/auth/callback'
//     },
//     async function(accessToken, refreshToken, profile, cb){
//       // runs when logging in
//         let user = await User.findOne({ facebookID: profile.id });
//         if(!user){
//             console.log("new user");
//             user = new User({
//                 facebookID: profile.id,
//                 name: profile.displayName,
//                 email: profile.email
//             });
//             await user.save();
//             return cb(null, profile);
//         }else{
//             console.log("existing user");
//             return cb(null, user);
//         };
// }));
// passport.serializeUser(function(user, cb) {
//     cb(null, user);
// });
// passport.deserializeUser(function(obj, cb) {
//     cb(null, obj);
// });

// callback
router.get('/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // returns logged in user
    // return res.json(req.user);

    // save user to express session
    req.session.user = req.user;
    // console.log(req.sessionID);
    // console.log(req.session.cookie);

    // redirect to home page
    res.redirect('http://localhost:3000');
});

// log in to facebook route
router.get('/login/facebook',
  passport.authenticate('facebook')
);

module.exports = router;