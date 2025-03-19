const HippoInfoModel = require("../models/hippoinfo")

exports.setHippoInfo = async (req, res) => {
    try {
        const { tgUserId, whichHippoImg } = req.body;
        const isNewUser = await HippoInfoModel.findOne({tgUserId});
        if (!isNewUser) {
            const temp = await HippoInfoModel({
                tgUserId,
                skin: 0,
                hat: -1,
                glasses: -1,
                clothes: -1
            });
            await temp.save();
        } else {
            await HippoInfoModel.findOneAndUpdate({
                tgUserId
            }, {
                skin: whichHippoImg.skin,
                hat: whichHippoImg.hat,
                glasses: whichHippoImg.glasses,
                clothes: whichHippoImg.clothes
            })
        }
        res.status(200).json({ message: true });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "" });
    }
}

exports.getHippoInfo = async (req, res) => {
    try {
        const { tgUserId } = req.body;
        const isNewUser = await HippoInfoModel.findOne({tgUserId});
        let temp = {};
        if (!isNewUser) {
            temp = {
                skin: 0,
                hat: -1,
                glasses: -1,
                clothes: -1
            };
        } else {
            temp = {
                skin: isNewUser.skin,
                hat: isNewUser.hat,
                glasses: isNewUser.glasses,
                clothes: isNewUser.clothes
            }
        }
        res.status(200).json({ message: temp });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: "" });
    }
}