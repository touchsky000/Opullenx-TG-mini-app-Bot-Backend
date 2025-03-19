const mongoose = require("mongoose")

const dailyClaimHistorySchema = new mongoose.Schema({
    tgUserId: Number,
    date: Date
})

module.exports = mongoose.model("DailyClaimHistory", dailyClaimHistorySchema);