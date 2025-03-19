const FriendModel = require("../models/friends")
const DatabaseController = require("../controller/database.controller")

exports.getProfileAvatar = async (userId, bot_token) => {
    try {
        const profilesResponse = await fetch(`https://api.telegram.org/bot${bot_token}/getUserProfilePhotos?user_id=${userId}`);
        const profiles = await profilesResponse.json();

        if (profiles.result.photos.length > 0) {
            const fileResponse = await fetch(`https://api.telegram.org/bot${bot_token}/getFile?file_id=${profiles.result.photos[0][2].file_id}`);
            const filePath = await fileResponse.json();

            const userAvatarUrl = `https://api.telegram.org/file/bot${bot_token}/${filePath.result.file_path}`;
            return userAvatarUrl;
        } else {
            console.log('No profile photos found.');
        }
    } catch (err) {
        console.error('Error fetching profile photos:', err.message);
    }
}

exports.isFriendExisted = async (tgUserId, friendId) => {
    try {
        const friends1 = await FriendModel.find({ tgUserId: tgUserId, friendId: friendId })
        const friends2 = await FriendModel.find({ tgUserId: friendId, friendId: tgUserId })
        if (friends1.length > 0) return false;
        else if (friends2.length > 0) return false;
        else return true;
    } catch (err) {
        console.log(err.message);
    }
}

exports.saveFriendInfo = async (tgUserId, friendId) => {
    try {
        if (await this.isFriendExisted(tgUserId, friendId) === false) return;
        const newFriend = new FriendModel({
            tgUserId,
            friendId,
        });
        await newFriend.save();
        const tempBalance = await DatabaseController.getTokenBalance(friendId);
        await DatabaseController.updateTokenBalance(tgUserId, 400);
        await DatabaseController.updateTokenBalance(friendId, tempBalance + 200);
    } catch(err) {
        console.log(err.message);
    }
}