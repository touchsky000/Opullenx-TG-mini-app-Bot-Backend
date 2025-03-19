const mongoose = require("mongoose");

const inviteFriendsSchema = new mongoose.Schema({
    tgUserId: {
        type: Number,
        required: false
    },
    friendId: {
        type: Number,
        required: false
    }    
})

module.exports = mongoose.model("InviteFriends", inviteFriendsSchema);
