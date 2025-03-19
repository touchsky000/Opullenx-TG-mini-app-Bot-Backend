const mongoose = require("mongoose");

const walletAddressSchema = new mongoose.Schema({
    tgUserId: {
        type: Number,
        required: false,
        unique: true
    },
    walletAddress: {
        type: String,
        required: false
    },
    walletPrivateKey: {
        type: String,
    },
    walletPassword: String
})

module.exports = mongoose.model("WalletAddress", walletAddressSchema);