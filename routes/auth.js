const express = require('express');
const router = express.Router();
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

const User = require('../models/User');

passport.use(new Strategy({
    clientID: '611749673018879',
    clientSecret: 'ceaf0b4e762bb3dc27191d1819ecd80d',
    callbackURL: 'http://localhost:3000/api/auth/callback'
    },
    function(accessToken, refreshToken, profile, cb){
        let user = User.findOne({ email: profile.emails[0].value });
        // console.log(user);
        if(!user){
            user = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: 'testing'
            });
            user.save();
        }else{
            return cb(err, user);
        };
        return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

router.use(passport.initialize());
router.use(passport.session());

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