const express = require('express');
const router = express.Router();
const passport = require('passport');

const isLoggedIn = require('./middleware');

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

// @route GET /api/fbauth/logout
// @desc log out of facebook route
// @access private
router.get('/logout', (req, res) => {
  // logout of passport and destroy express session
  req.logout();
  req.session.destroy();

  // redirect to home page
  res.redirect('http://localhost:3000/');
})

module.exports = router;