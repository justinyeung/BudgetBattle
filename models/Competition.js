const mongoose = require("mongoose");

const CompetitionSchema = new mongoose.Schema({
  user1: {
    type: String,
  },
  user1name: {
    type: String,
  },
  user2: {
    type: String,
  },
  user2name: {
    type: String,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  user1total: {
    type: Number,
  },
  user2total: {
    type: Number,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

module.exports = mongoose.model("competition", CompetitionSchema);
