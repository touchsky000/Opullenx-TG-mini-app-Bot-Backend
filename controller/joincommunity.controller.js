const DatabaseController = require("./database.controller");
const JoinCommunity = require("../models/joincommunity");
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot("7938288165:AAF8s_x-EombuU2v3eBu_QHlinEFRpIaxIg");

exports.setJoinCommunity = async (req, res) => {
    try {
        const { tgUserId, isCompleted } = req.body;
        const existUser = await DatabaseController.existCommunityUser(tgUserId);
        console.log(existUser, isCompleted);
        
        if (!existUser) {
            const tempCommunity = await new JoinCommunity({
                tgUserId,
            });
            await tempCommunity.save();
            res.status(200).json({ message: true });
        } else {
            await JoinCommunity.findOneAndUpdate(
                { tgUserId },
                { isCompleted },
                { new: true } 
            );
            res.status(200).json({ message: true });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "" });
    }
};

exports.getJoinCommunity = async (req, res) => {
    try {
        const { tgUserId } = req.body;
        const existUser = await DatabaseController.existTgUser(tgUserId);
        if (!existUser) {
            res.status(200).json({ message: "", content: "user is not existed" });
        } else {
            const joinCommunity = await JoinCommunity.findOne({ tgUserId });
            res.status(200).json({ message: joinCommunity?.isCompleted });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "" });
    }
};

exports.checkTelegram = async (req, res) => {
    try {
        const {tgUserId} = req.body;
        const channelID = "-1001615861854";
        // const channelID = "@OpulenceXFin";
        
        await bot.getChatMember(channelID, tgUserId)
            .then(() => {
                console.log("this id exist in this channel");
                res.status(200).send({ message: true });
            })
            .catch(err => {
                console.log("This id don't exist in this channel");
                res.status(200).send({ message: false });
                console.log(err.message, channelID, tgUserId);
            })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: false });
    }
}
