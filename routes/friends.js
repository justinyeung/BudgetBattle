const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const User = require('../models/User');

// @route POST /api/friends/add
// @desc add friend for current user
// @access private
router.post('/add', isLoggedIn, async (req, res) => {
    try{
        // get current user
        let user = await User.findOne({ userID: req.session.user.userID });

        // append new friend to end of list
        user.friends = [...user.friends, req.body.friendID];

        user.save();
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});


module.exports = router;