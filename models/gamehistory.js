const mongoose = require("mongoose");

const gameHistorySchema = new mongoose.Schema({
    tgUserId: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    bet: {
        type: Number,
        required: false
    },
    stopCrash: {
        type: Number,
        required: false
    },
    profit: {
        type: Number,
        required: false
    }
})

module.exports = mongoose.model("GameHistory", gameHistorySchema);