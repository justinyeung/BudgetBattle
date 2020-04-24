const express = require('express');
const router = express.Router();
const passport = require('passport');

// callback
router.get('/callback', 
  passport.authenticate('facebook', { failureRedirect: '/loginfail' }),
  function(req, res) {
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

module.exports = router;