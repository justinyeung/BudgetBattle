const express = require("express");
const router = express.Router();

const isLoggedIn = require("./middleware");

const Purchase = require("../models/Purchase");
const Competition = require("../models/Competition");

// @route GET /api/purchases
// @desc get current user's purchases
// @access private
router.get("/", isLoggedIn, async (req, res) => {
  try {
    // query for purchase in db
    let purchases = await Purchase.find({ userID: req.session.user.userID });

    res.json(purchases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route GET /api/purchases/competitor/:id
// @desc get competitor's purchases
// @access private
router.get("/competitor/:id", isLoggedIn, async (req, res) => {
  try {
    // input params
    // const { id } = req.body;
    const userID = req.params.id;

    console.log(userID);

    // query for purchase in db
    let purchases = await Purchase.find({ userID: userID });

    res.json(purchases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST /api/purchases
// @desc add a purchase
// @access private
router.post("/", isLoggedIn, async (req, res) => {
  try {
    // input params
    const { date, amount, location, category } = req.body;

    // const month = date.getMonth();
    // const year = date.getYear();
    const month = new Date(date).getMonth();
    const year = new Date(date).getFullYear();

    // create new purchase object
    newPurchase = new Purchase({
      userID: req.session.user.userID,
      date,
      month,
      year,
      amount,
      location,
      category,
    });

    // Update sums in accepted competitions
    await Competition.updateMany(
      { user1: req.session.user.userID },
      {
        $inc: {
          user1total: amount,
        },
      }
    );
    await Competition.updateMany(
      { user2: req.session.user.userID },
      {
        $inc: {
          user2total: amount,
        },
      }
    );

    // save purchase to db
    const purchase = await newPurchase.save();
    res.json(purchase);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
    if (userID) purchaseFields.userID = userID;
    if (date) purchaseFields.date = date;
    if (amount) purchaseFields.amount = amount;
    if (location) purchaseFields.location = location;
    if (category) purchaseFields.category = category;

    // query for purchase in db
    let purchase = await Purchase.findById(purchaseID);

    // check if purchase exists
    if (!purchase) {
      return res.status(404).json({ msg: "Purchase Not Found" });
    }

    // Get old purchase amount and difference
    let oldPurchaseAmount = purchase.amount;
    let purchaseDiff = amount - oldPurchaseAmount;

    // Update sums in accepted competitions
    await Competition.updateMany(
      { user1: req.session.user.userID },
      {
        $inc: {
          user1total: purchaseDiff,
        },
      }
    );
    await Competition.updateMany(
      { user2: req.session.user.userID },
      {
        $inc: {
          user2total: purchaseDiff,
        },
      }
    );

    // find purchase and update
    purchase = await Purchase.findByIdAndUpdate(
      purchaseID,
      { $set: purchaseFields },
      { new: true }
    );

    res.json(purchase);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
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
    if (!purchase) {
      return res.status(404).json({ msg: "Purchase Not Found" });
    }

    // get value of old purchase amount
    let oldAmount = purchase.amount;

    // Update sums in accepted competitions
    await Competition.updateMany(
      { user1: req.session.user.userID },
      {
        $inc: {
          user1total: oldAmount * -1,
        },
      }
    );
    await Competition.updateMany(
      { user2: req.session.user.userID },
      {
        $inc: {
          user2total: oldAmount * -1,
        },
      }
    );

    await Purchase.findByIdAndDelete(purchaseID);

    res.json({ msg: "Purchase Removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
