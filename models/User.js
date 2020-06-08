const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userID: {
        type: String,
    },
    name: {
        type: String,
    },
    friends: [
        {
            type: Object,
            ref: 'friend',
        },
    ],
});

module.exports = mongoose.model('user', UserSchema);
