const mongoose = require("mongoose");

const CompetitionSchema = new mongoose.Schema({
    user1: {
        // outgoing 
        // id:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        // },
        // name: {
        //     type: String,
        //     required: true
        // }
        type: String
    },
    user1name: {
        type: String
    },
    user2: {
        // incoming
        // id:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "User"
        // },
        // name: {
        //     type: String,
        //     required: true
        // }
        type: String
    },
    user2name: {
        type: String
    },
    status: {
        type: String,
        required:true,
        default: "Pending"
    }
})

module.exports = mongoose.model('competition', CompetitionSchema);