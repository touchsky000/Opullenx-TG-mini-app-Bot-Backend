const mongoose = require("mongoose");

const joinCommunitySchema = new mongoose.Schema({
  tgUserId: Number,
  isCompleted: {
    type: [Boolean],
    default: Array(8).fill(false)
  }
});

module.exports = mongoose.model("JoinCommunity", joinCommunitySchema);
