const mongoose = require('mongoose');

const FriendSchema = mongoose.Schema({
    user1: {
        type: String
    },
    user1name:{
        type: String
    },
    user2: {
        type: String
    },
    user2name:{
        type: String
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    }
    
});

module.exports = mongoose.model('friend', FriendSchema);