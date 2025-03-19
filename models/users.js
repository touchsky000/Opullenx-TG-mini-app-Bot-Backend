const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    user: {
        type: String,
        required: false
    },
    tgUserId: {
        type: Number,
        required: false,
        unique: true
    },
    realName: {
        type: String,
        required: false
    },
    avatarUrl: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model("Users", usersSchema)