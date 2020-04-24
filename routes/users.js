const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const User = require('../models/User');

// @route GET /api/users/current
// @desc get current logged in user
// @access private
router.get('/current', isLoggedIn, (req, res) => {
  try {
    res.json(req.session.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }
});

// @route GET /api/users/logout
// @desc log out of route
// @access private
router.get('/logout', isLoggedIn, (req, res) => {
  try {
    // logout of passport and destroy express session
    req.logout();
    req.session.destroy();
  
    // redirect to home page
    // res.redirect('http://localhost:3000/');
    return res.json({ msg: "User Logged Out"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }
});

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
    console.error(err.message);
    res.status(500).send('Server Error'); 
  }
  
})


module.exports = router;