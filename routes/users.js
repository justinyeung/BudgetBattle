const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

// @route GET /api/users/current
// @desc get current logged in user
// @access private
router.get('/current', isLoggedIn, (req, res) => {
    res.json(req.session.user);
  });

module.exports = router;