const mongoose = require("mongoose");

const hippoInfoSchema = new mongoose.Schema({
    tgUserId: Number,
    skin: Number,
    hat: Number,
    glasses: Number,
    clothes: Number
})

module.exports = mongoose.model("HippoInfo", hippoInfoSchema);