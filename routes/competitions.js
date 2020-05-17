const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const Competition = require('../models/Competition');
const User = require('../models/User');
const Purchase = require('../models/Purchase');

// @route GET /api/competitions/accepted
// @desc get a user's accepted competitions
// @access private
router.get('/accepted', isLoggedIn, async (req, res) => {
    try {
        // get all accepted outgoing and incoming competitions
        let competitions = await Competition.find({ 
            $or:[
                {user1: req.session.user.userID, status: "Accepted"},
                {user2: req.session.user.userID, status: "Accepted"}
              ]
        });

        res.json(competitions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET /api/competitions/outpending
// @desc get a user's outgoing pending requests
// @access private
router.get('/outpending', isLoggedIn, async (req, res) => {
    try {
        // get all pending competitions
        let competitions = await Competition.find({ 
            user1: req.session.user.userID, 
            status: "Pending"
        });

        res.json(competitions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET /api/competitions/inpending
// @desc get a user's incoming pending requests
// @access private
router.get('/inpending', isLoggedIn, async (req, res) => {
    try {
        // get all pending competitions
        let competitions = await Competition.find({ 
            user2: req.session.user.userID, 
            status: "Pending"
        });

        res.json(competitions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST /api/competitions/send
// @desc send a pending competition request
// @access private
router.post('/send', isLoggedIn, async (req, res) => {
    try {
        // input params
        // TODO month and year
        const { id, numMonth: month, numYear: year } = req.body;

        // query for user2 name
        let user2 = await User.findOne({ userID: id });

        // create new competition
        newCompetition = new Competition({
            user1: req.session.user.userID,
            user1name: req.session.user.name,
            user2: id,
            user2name: user2.name,
            month: month,
            year: year,
            status: "Pending"
        });

        const competition = await newCompetition.save();

        res.json(competition);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route PUT /api/competitions/accept
// @desc accept a inpending competition request
// @access private
router.put('/', isLoggedIn, async (req, res) => {
    try {
        // input params
        const { compID } = req.body;

        // find competition
        let competition = await Competition.findById(compID);

        // check if competition exists
        if(!competition){
            return res.status(404).json({ msg: "Competition Not Found" });
        }

        if(competition.user2 !== req.session.user.userID){
            return res.status(404).json({ msg: "Cannot Accept Outgoing Competition"});
        }

        // find competition and update status to accepted
        await Competition.findByIdAndUpdate(compID, 
            { $set: {
                status: "Accepted"
                }
            }
        );

        // find and return updated competition
        let returnCompetition = await Competition.findById(compID);
        res.json(returnCompetition);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE /api/competitions
// @desc reject or delete a competition request or competition
// @access private
router.delete('/', isLoggedIn, async (req, res) => {
    try {
        // input params
        const { comp } = req.body;

        // find competition
        let competition = await Competition.findById(comp.compID);

        // check if competition exists
        if(!competition){
            return res.status(404).json({ msg: "Competition Not Found" });
        }
        
        await Competition.findByIdAndDelete(comp.compID);
        
        res.json({ msg: "Competition Rejected" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET /api/competitions/:id
// @desc get all the purchases for a specific competition
// @access private
router.get('/:id', isLoggedIn, async (req, res) => {
    try {
        // input params
        const compID = req.params.id;

        // get competition object
        let competition = await Competition.findById(compID);

        // Get total for users
        let user1purchases = await Purchase.aggregate([
            {$match: {
                    userID: competition.user1,
                    month: competition.month - 1,
                    year: competition.year
                }
            },
            {$group: {
                _id: null,
                count: { $sum: "$amount" }
            }
        }])
        let user2purchases = await Purchase.aggregate([
            {$match: {
                    userID: competition.user2,
                    month: competition.month - 1,
                    year: competition.year
                }
            },
            {$group: {
                _id: null,
                count: { $sum: "$amount" }
            }
        }])

        console.log(user1purchases[0].count);
        console.log(user2purchases[0].count);

        res.json({ user1total: user1purchases[0].count, user2total: user2purchases[0].count });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
})

module.exports = router;