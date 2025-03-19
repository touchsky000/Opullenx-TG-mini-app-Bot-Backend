const mongoose = require("mongoose");

const wonLostValueSchema = new mongoose.Schema({
    tgUserId: {
        type: Number,
        required: false
    },
    wonValue: {
        type: Number,
        required: false,
        default: 0
    },
    lostValue: {
        type: Number,
        required: false,
        default: 0
    },
})

module.exports = mongoose.model("WonLostValue", wonLostValueSchema);