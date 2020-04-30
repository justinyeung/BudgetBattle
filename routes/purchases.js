const express = require('express');
const router = express.Router();

const isLoggedIn = require('./middleware');

const Purchase = require('../models/Purchase');

// @route GET /api/purchases
// @desc get a user's purchases
// @access private
router.get("/", isLoggedIn, async (req, res) => {
    try {
        // input params
        // const { userID } = req.body;


        // query for purchase in db
        let purchases = await Purchase.find({ userID: req.session.user.userID });

        // check if purchase exists
        // if(!purchase){
        //     return res.status(404).json({ msg: "Purchase Not Found" });
        // }
        res.json(purchases);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route POST /api/purchases
// @desc add a purchase
// @access private
router.post("/", isLoggedIn, async (req, res) => {
    try {
        // input params
        const { date, amount, location, category } = req.body;

        // create new purchase object
        newPurchase = new Purchase({
            userID: req.session.user.userID,
            date,
            amount,
            location,
            category
        });

        // save purchase to db
        const purchase = await newPurchase.save();
        res.json(purchase);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route PUT /api/purchases
// @desc edit a purchase
// @access private
router.put("/", isLoggedIn, async (req, res) => {
    try {
        // input params
        const { purchaseID, userID, date, amount, location, category } = req.body;

        // Build purchase object
        const purchaseFields = {};
        if(userID) purchaseFields.userID = userID;
        if(date) purchaseFields.date = date;
        if(amount) purchaseFields.amount = amount;
        if(location) purchaseFields.location = location;
        if(category) purchaseFields.category = category;

        // query for purchase in db
        let purchase = await Purchase.findById(purchaseID);

        // check if purchase exists
        if(!purchase){
            return res.status(404).json({ msg: "Purchase Not Found" });
        }

        // find purchase and update
        purchase = await Purchase.findByIdAndUpdate(purchaseID, 
            { $set: purchaseFields},
            { new: true });
        
        res.json(purchase);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

// @route DELETE /api/purchases
// @desc delete a purchase
// @access private
router.delete("/", isLoggedIn, async (req, res) => {
    try {
        // input params
        const { purchaseID } = req.body;

        // query for purchase in db
        let purchase = await Purchase.findById(purchaseID);

        // check if purchase exists
        if(!purchase){
            return res.status(404).json({ msg: "Purchase Not Found" });
        }

        await Purchase.findByIdAndDelete(purchaseID);

        res.json({ msg: "Purchase Removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

module.exports = router;