const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const User = require('../models/User');
const Friend = require('../models/Friend');

// // @route GET /api/friends/accepted
// // @desc get a user's friends
// // @access private
// router.get('/accepted', isLoggedIn, async (req, res) => {
//     try {
//         // get all accepted outgoing and incoming friends
//         let friends = await Friend.find({ 
//             $or:[
//                 {user1: req.session.user.userID, status: "Accepted"},
//                 {user2: req.session.user.userID, status: "Accepted"}
//               ]
//         });

//         res.json(friends);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error'); 
//     }
// });

// // @route GET /api/friends/outpending
// // @desc get a user's outgoing pending friend requests
// // @access private
// router.get('/outpending', async (req, res) => {
//     try {
//         // get all pending friends
//         let friends = await Friend.find({ 
//             user1: req.session.user.userID, 
//             status: "Pending"
//         });

//         res.json(friends);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error'); 
//     }
// });

// // @route GET /api/friends/inpending
// // @desc get a user's ingoing pending friend requests
// // @access private
// router.get('/inpending', async (req, res) => {
//     try {
//         // get all pending friends
//         let friends = await Friend.find({ 
//             user2: req.session.user.userID, 
//             status: "Pending"
//         });

//         res.json(friends);
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error'); 
//     }
// });

// @route POST /api/friends/send
// @desc send a friend request
// @access private
router.post('/send', async (req, res) => {
    try{
        // get current user
        // let user = await User.findOne({ userID: req.session.user.userID });

        // get current user's friends and friend requests
        let currentFriends = await Friend.find({ 
            $or:[
                {user1: req.session.user.userID},
                {user2: req.session.user.userID}
              ]
        });

        // input params
        const { friendID } = req.body;

        // create new Friend
        newFriend = new Friend({
            user1: req.session.user.userID,
            user2: friendID,
            status: "Pending"
        });

        // update user with new friend
        friendsList = [...currentFriends, newFriend];
        updatedUser = await User.findByIdAndUpdate(req.session.user._id, 
            { 
                friends: friendsList
            },
            {new: true}
        );

        newFriend.save();
        res.json(updatedUser);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route PUT /api/friends/accept
// @desc accept an inpending friend request
// @access private
router.put('/', async (req, res) => {
    try {
        // input params
        const { friendID } = req.body;

        // find friend
        let friend = await friend.findById(friendID);

        // check if friend exists
        if(!friend){
            return res.status(404).json({ msg: "friend Not Found" });
        }

        if(friend.user2 !== req.session.user.userID){
            console.log("Cannot accept outoing friend");
            return res.status(404).json({ msg: "Cannot Accept Outgoing friend"});
        }

        // find friend and update status to accepted
        await Friend.findByIdAndUpdate(friendID, 
            { $set: {
                status: "Accepted"
                }
            }
        );

        // find and return updated friend
        let returnfriend = await friend.findById(friendID);
        res.json(returnfriend);
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
        // get current user
        // let user = await User.findOne({ userID: req.session.user.userID });

        // filter out user
        // user.friends = user.friends.filter(friend => friend.userID != req.body.friendID);

        // TEMPORARY. friendares entire friend string
        // user.friends = user.friends.filter(f => f !== req.body.friendID);

        // input params
        const { friendID } = req.body;

        // find friend with current user and friendid
        let friend = await Friend.findOne({
            $or:[
                {
                    $and:[
                        {user1: req.session.user.userID},
                        {user2: friendID.friendID}
                    ]
                },
                {
                    $and:[
                        {user1: friendID.friendID},
                        {user2: req.session.user.userID}
                    ]
                },
                
              ]
        });

        // check if friend exists
        if(!friend){
            return res.status(404).json({ msg: "Friend Not Found" });
        }

        // delete friend
        await Friend.findByIdAndDelete(friend._id);

        // user.save();
        // res.json(user);
        res.json({ msg: "Friend deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
})

module.exports = router;