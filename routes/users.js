const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

// @route GET /api/users/current
// @desc get current logged in user
// @access private
router.get('/current', isLoggedIn, (req, res) => {
    res.json(req.session.user);
  });

// @route GET /api/users/logout
// @desc log out of facebook route
// @access private
router.get('/logout', isLoggedIn, (req, res) => {
    // logout of passport and destroy express session
    req.logout();
    req.session.destroy();
  
    // redirect to home page
    res.redirect('http://localhost:3000/');
  })

module.exports = router;