const FriendModel = require("../models/friends");
const FreeTokenModel = require("../models/freetoken");
const DatabaseController = require("../controller/database.controller")

exports.getFriendList = async (req, res) => {
    try {
        const { tgUserId } = req.body;
        console.log("friends", tgUserId);
        
        const friendsList1 = await FriendModel.find({ tgUserId });
        const friendsList2 = await FriendModel.find({ friendId: tgUserId });
        let _friendTgUserIdlist = [];
        
        if (friendsList2.length > 0) {
            friendsList2.map(item => _friendTgUserIdlist.push(item.tgUserId));
        }
        
        if (friendsList1.length > 0) {
            friendsList1.map(item => _friendTgUserIdlist.push(item.friendId));
        }
        console.log("friendsList1", friendsList1);
        console.log("friendsList2", friendsList2);
        
        let friendList = [];
        await Promise.all(
            _friendTgUserIdlist.map(async item => {
                const _friendItem = await DatabaseController.getUserInfo(item);
                const user = await DatabaseController.getTokenBalance(item);
                
                friendList.push({
                    realName: _friendItem?.realName,
                    avatarUrl: _friendItem?.avatarUrl,
                    balance: user?.tokenBalance
                })
            })
        )
        console.log("friendList", friendList);
        res.status(200).json({ message: friendList });
    } catch (err) {
        console.log(err.message);
        res.status(200).json({ message: "" });
    }
}

exports.getFriendNumber = async (req, res) => {
    try {
        const { tgUserId } = req.body;
        const friendsList1 = await FriendModel.find({ tgUserId });
        const friendsList2 = await FriendModel.find({ friendId: tgUserId });
        const count = friendsList1?.length + friendsList2?.length;
        if (count > 0) {
            const tokenBalance = await DatabaseController.getTokenBalance(tgUserId);
            res.status(200).json({ message: {count, tokenBalance}});
        } else {
            res.status(200).json({ message: {count:0, tokenBalance: -1}});
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 0});
    }
    

}