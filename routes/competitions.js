const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const Competition = require('../models/Competition');

// @route GET /api/competitions/accepted
// @desc get a user's accepted competitions
// @access private
router.get('/accepted', async (req, res) => {
    try {
        // get all accepted competitions
        let competitions = await Competition.find({ 
            user1: req.session.user.userID, 
            status: "Accepted"
        });

        res.json(competitions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route GET /api/competitions/pending
// @desc get a user's accepted competitions
// @access private
router.get('/pending', async (req, res) => {
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

// @route POST /api/competitions/send
// @desc send a pending competition request
// @access private
router.post('/send', async (req, res) => {
    try {
        // input params
        const { id: user2ID } = req.body;

        // create new competition
        newCompetition = new Competition({
            user1: req.session.user.userID,
            user2: user2ID,
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
// @desc accept a pending competition request
// @access private
router.put('/accept', async (req, res) => {
    try {
        // input params
        const { compID } = req.body;

        // find competition
        let competition = await Competition.findById(compID);

        // check if competition exists
        if(!competition){
            return res.status(404).json({ msg: "Competition Not Found" });
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

// @route DELETE /api/competitions/reject
// @desc accept a pending competition request
// @access private
router.delete('/reject', async (req, res) => {
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


module.exports = router;