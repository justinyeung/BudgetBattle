const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userID: {
        type: String
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type:String
    },
    friends: [
        {
            // type: mongoose.Schema.Types.ObjectId,
            type: String,
            ref: "friend"
        }
    ],
    purchases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "purchase"
        }
    ],
    saved: {
        locations: [
            {
                type: String
            }
        ],
        categories: [
            {
                type: String
            }
        ]

    }
});

module.exports = mongoose.model('user', UserSchema);