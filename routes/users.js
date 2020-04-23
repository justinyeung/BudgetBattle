const express = require('express');
const router = express.Router();
const auth = require('./auth');

const User = require('../models/User');

// @route POST api/users
// @desc Register a user
// @access Public
// @TODO log user in
router.post('/', async (req, res) => {

    const { name, email, password } = req.body;

    try{
        // check to see if user already exists
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ msg: "User already exists"});
        }

        // create a new user
        user = new User({
            name: name,
            email: email,
            password: password
        });

        // save to database, send to server
        const newUser = await user.save();
        res.json(newUser);
    }catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/users
// @desc Delete your user
// @access Private
// @TODO ensure user being deleted is logged in
router.delete('/:id', async (req, res) => {
    try {
        // find and delete user
        await User.findByIdAndDelete(req.params.id);

        res.json({msg: "User Removed"});
    } catch (err) {
        
    }
})

module.exports = router;