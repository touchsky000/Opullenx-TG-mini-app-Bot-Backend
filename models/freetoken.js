const mongoose = require("mongoose");

const tokenBalanceSchema = new mongoose.Schema({
    tgUserId: Number,
    tokenBalance: Number
})

module.exports = mongoose.model("TokenBalance", tokenBalanceSchema);