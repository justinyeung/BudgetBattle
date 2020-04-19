const express = require('express');
const router = express.Router();

const User = require('../models/User');

// @route POST api/users
// @desc Register a user
// @access Public
// @TODO authentication
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

module.exports = router;