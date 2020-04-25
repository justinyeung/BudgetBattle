const mongoose = require('mongoose');

const PurchaseSchema = mongoose.Schema({
    userID: {
        // type: mongoose.Schema.Types.ObjectId,
        type: String,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    location: {
        type: String
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model('purchase', PurchaseSchema);