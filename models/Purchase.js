const mongoose = require("mongoose");

const PurchaseSchema = mongoose.Schema({
  userID: {
    type: String,
    ref: "user",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  amount: {
    type: Number,
    default: 0,
  },
  location: {
    type: String,
  },
  category: {
    type: String,
  },
});

module.exports = mongoose.model("purchase", PurchaseSchema);
