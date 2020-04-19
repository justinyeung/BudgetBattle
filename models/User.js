const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type:String,
        required:true
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