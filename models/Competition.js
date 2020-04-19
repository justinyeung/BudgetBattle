const mongoose = require("mongoose");

const CompetitionSchema = new mongoose.Schema({
    user1: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        }
    },
    user2: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        name: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        required:true,
        default: "pending"
    }
})

module.exports = mongoose.model('competition', CompetitionSchema);