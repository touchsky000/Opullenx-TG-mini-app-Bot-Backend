const dailyClaimHistoryModel = require("../models/dailyclaimhistory")
const DatabaseController = require("./database.controller")

exports.getUpdateRecentDate = async (req, res) => {
    try {
        const { tgUserId } = req.body;
        const existUser = await dailyClaimHistoryModel.findOne({tgUserId});
        
        if (!existUser) {
            res.status(200).json({ message: "" });
            console.log("Logic Error!");
        } else {
            const updateRecentDate = await dailyClaimHistoryModel.findOne({ tgUserId });
            res.status(200).json({ message: updateRecentDate.date });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Internal Error" });
        console.log(err.message);
    }
}

exports.getDailyClaim = async (req, res) => {
    try {
        const { tgUserId, balance } = req.body;
        
        await DatabaseController.updateTokenBalance(tgUserId, balance);
        const newDate = await DatabaseController.updateDailyClaimHistory(tgUserId);
        res.status(200).json({ message: newDate });
    } catch (err) {
        res.status(500).json({message: ""});
        console.log("Server Internal Error!");
    }
}

exports.getServerDate = async (req, res) => {
    try {
        if(req.body.tgUserId > 0)
            res.status(200).json({message: new Date().toUTCString()});
    } catch (err) {
        res.status(500).json({message: ""});
        console.log(err.message);
    }
}