const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    facebookID: {
        type: String
    },
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // required: true,
        // unique: true
    },
    password: {
        type:String
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
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