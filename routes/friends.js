const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const User = require('../models/User');
const Friend = require('../models/Friend');

// @route POST /api/friends/send
// @desc send a friend request
// @access private
router.post('/send', isLoggedIn, async (req, res) => {
    try {
        // get current user's friends and friend requests
        let currentFriends = await Friend.find({
            $or: [
                { user1: req.session.user.userID },
                { user2: req.session.user.userID },
            ],
        });

        // input params
        const { friendID } = req.body;

        // find friend's name
        let friend = await User.findOne({ userID: friendID });

        // create new Friend
        newFriend = new Friend({
            user1: req.session.user.userID,
            user1name: req.session.user.name,
            user2: friendID,
            user2name: friend.name,
            date: new Date(),
            status: 'Pending',
        });

        // update user with new friend
        friendsList = [...currentFriends, newFriend];
        updatedUser = await User.findByIdAndUpdate(
            req.session.user._id,
            {
                friends: friendsList,
            },
            { new: true }
        );

        // save new friend to db
        newFriend.save();
        res.json(updatedUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route PUT /api/friends/accept
// @desc accept an inpending friend request
// @access private
router.put('/', isLoggedIn, async (req, res) => {
    try {
        // input params
        const { friendID } = req.body;

        // find friend with current user and id
        let friend = await Friend.findOne({
            $and: [{ user1: friendID }, { user2: req.session.user.userID }],
        });

        // check if friend exists
        if (!friend) {
            return res.status(404).json({ msg: 'friend Not Found' });
        }

        // update friend
        await Friend.findByIdAndUpdate(friend._id, {
            $set: {
                status: 'Accepted',
                date: new Date(),
            },
        });

        // find and return updated friend
        res.json(await Friend.findById(friend._id));
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE /api/friends
// @desc reject or delete friend request or friend for current user
// @access private
router.delete('/', isLoggedIn, async (req, res) => {
    try {
        // input params
        const { friendID } = req.body;

        // find friend with current user and id
        let friend = await Friend.findOne({
            $or: [
                {
                    $and: [
                        { user1: req.session.user.userID },
                        { user2: friendID.friendID },
                    ],
                },
                {
                    $and: [
                        { user1: friendID.friendID },
                        { user2: req.session.user.userID },
                    ],
                },
            ],
        });

        // check if friend exists
        if (!friend) {
            return res.status(404).json({ msg: 'Friend Not Found' });
        }

        // delete friend
        await Friend.findByIdAndDelete(friend._id);

        // user.save();
        // res.json(user);
        res.json({ msg: 'Friend deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
