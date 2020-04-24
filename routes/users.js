const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const User = require('../models/User');

// @route GET /api/users/current
// @desc get current logged in user
// @access private
router.get('/current', isLoggedIn, (req, res) => {
    res.json(req.session.user);
  });

// @route GET /api/users/logout
// @desc log out of route
// @access private
router.get('/logout', isLoggedIn, (req, res) => {
    // logout of passport and destroy express session
    req.logout();
    req.session.destroy();
  
    // redirect to home page
    // res.redirect('http://localhost:3000/');
    return res.json({ msg: "User Logged Out"});
  })

// @route DELETE /api/users/delete
// @desc delete current logged in user
// @access private
router.delete('/delete', isLoggedIn, async (req, res) => {
  try {
    let user = await User.findOne({ userID: req.session.user.userID });

    if(!user){
      return res.status(404).json({ msg: "User not found" });
    }

    await User.findByIdAndRemove(req.session.user._id);

    req.logout();
    req.session.destroy();

    return res.json({ msg: "User Deleted" });
  } catch (error) {
    
  }
  
})


module.exports = router;