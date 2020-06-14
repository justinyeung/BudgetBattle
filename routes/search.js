const express = require('express');
const router = express.Router();

const User = require('../models/User');

// @route GET /api/search
// @desc search users
// @access public
router.get('/:id', async (req, res) => {
    try {
        const friendSearch = req.params.id;

        let users = await User.find({
            $or: [
                { name: { $regex: friendSearch, $options: 'i' } },
                { userID: friendSearch },
            ],
        });

        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
