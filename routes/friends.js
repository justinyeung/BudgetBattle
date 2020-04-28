const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const User = require('../models/User');

// @route POST /api/friends/
// @desc add friend for current user
// @access private
router.post('/', isLoggedIn, async (req, res) => {
    try{
        // get current user
        let user = await User.findOne({ userID: req.session.user.userID });

        // append new friend to end of list
        // gets input of friendID
        user.friends = [...user.friends, req.body.friendID];

        user.save();
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE /api/friends
// @desc delete friend for current user
// @access private
router.delete('/', isLoggedIn, async (req, res) => {
    try {
        // get current user
        let user = await User.findOne({ userID: req.session.user.userID });

        // filter out user
        // user.friends = user.friends.filter(friend => friend.userID != req.body.friendID);

        // TEMPORARY. compares entire friend string
        user.friends = user.friends.filter(friend => friend !== req.body.friendID);

        user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
})

module.exports = router;