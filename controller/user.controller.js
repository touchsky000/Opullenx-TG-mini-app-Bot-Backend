const DatabaseController = require("./database.controller")

exports.setUser = async (req, res) => {
    try {
        const { user, tgUserId, realName, avatarUrl } = req.body;
        const existUser = await DatabaseController.existTgUser(tgUserId);
        
        if (!existUser) {
            await DatabaseController.saveNewUser(user, tgUserId, realName, avatarUrl);
            await DatabaseController.updateTokenBalance(tgUserId, 200);
            await DatabaseController.updateDailyClaimHistory(tgUserId);
            res.status(200).json({ message: false });
        } else {
            res.status(200).json({ message: true });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "" });     
    }
}   