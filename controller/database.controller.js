const UserModel = require("../models/users")
const GameHistoryModel = require("../models/gamehistory")
const FreeTokenModel = require("../models/freetoken")
const DailyClaimHistoryModel = require("../models/dailyclaimhistory")
const WalletAddressModel = require("../models/walletaddress")
const JoinCommunityModel = require("../models/joincommunity")
const WonLostValueModel = require("../models/wonlostvalue");

exports.existTgUser = async (tgUserId) => {
    try {
        const user = await UserModel.findOne({ tgUserId })
        if (user) return true;
        else return false;
    } catch(err) {
        console.log(err.message);
        return false;
    }
}

exports.getTokenBalance = async (tgUserId) => {
    try {
        const tempUser = await FreeTokenModel.findOne({ tgUserId });
        return tempUser ? tempUser.tokenBalance : 0;
    } catch (err) {
        console.error(err.message);
        return 0;
    }
}

exports.getUserInfo = async (tgUserId) => {
    try {
        const tempUser = await UserModel.findOne({ tgUserId });
        return tempUser;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

exports.saveNewUser = async (user, tgUserId, realName, avatarUrl) => {
    try {
        const newUser = new UserModel({
            user, tgUserId, realName, avatarUrl
        });
        await newUser.save();
        return true;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

exports.updateTokenBalance = async (tgUserId, tokenBalance) => {
    try {
        const isNewUser = await FreeTokenModel.findOne({ tgUserId });
        
        if (!isNewUser) {
            const newUser = new FreeTokenModel({ tgUserId, tokenBalance: Number(tokenBalance).toFixed(2) });
            await newUser.save();
        } else {
            await FreeTokenModel.findOneAndUpdate({ 
                tgUserId 
            },{
                tokenBalance: Number(tokenBalance).toFixed(2)
            });
        }
        return true;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

exports.updateDailyClaimHistory = async (tgUserId) => {
    const isNewUser = await DailyClaimHistoryModel.findOne({tgUserId});

    try {
        if (!isNewUser) {
            const updateDailyClaimHistoryData = new DailyClaimHistoryModel({
                tgUserId,
                date: new Date().toUTCString()
            });
            await updateDailyClaimHistoryData.save();
        } else {
            await DailyClaimHistoryModel.findOneAndDelete({
                tgUserId
            }, {
                date: new Date().toUTCString()
            });
        }
        return new Date().toUTCString();
    } catch (err) {
        console.error("Failed to Update Daily Airdrop", err.message);
    }
}

exports.saveGameHistory = async (tgUserId, bet, stopCrash, profit, balance) => {
    console.log(tgUserId, bet, stopCrash, profit, balance);
    
    try {
        if (balance < 0 || stopCrash < 0) return true;
        const currentDate = new Date().toUTCString();
        const saveHistoryGame = new GameHistoryModel({
            tgUserId,
            date: currentDate,
            bet,
            stopCrash,
            profit,
        })
        await saveHistoryGame.save();
        return true;
    } catch (err) {
        return false;
    }
}

exports.saveWalletAddress = async ({tgUserId, walletAddress, walletPrivateKey, walletPassword}) => {
    try {
        const saveWalletAddress = new WalletAddressModel({
            tgUserId, walletAddress, walletPrivateKey, walletPassword
        })
        await saveWalletAddress.save();
        return true;
    } catch (err) {
        return false;
    }
}

exports.getWalletAddress = async ({ tgUserId }) => {
    try {
        const walletAddress = await WalletAddressModel.findOne({ tgUserId });
        return walletAddress || "";
    } catch (err) {
        return "";
    }
}

exports.existCommunityUser = async (tgUserId) => {
    const user = await JoinCommunityModel.findOne({ tgUserId })
    if (user) return true;
    else return false;
}

exports.existWonLostValue = async (tgUserId) => {
    const user = await WonLostValueModel.findOne({ tgUserId });
    if (user) return true;
    else return false;
}

exports.saveWonLostValue = async (tgUserId, wonValue, lostValue) => {
    try {
        const exsitUser = await this.existWonLostValue(tgUserId);
        if (exsitUser) {
            const temp = await WonLostValueModel.findOneAndUpdate({ tgUserId }, {wonValue, lostValue});
            console.log("temp", temp);
        } else {
            const tempDoc = new WonLostValueModel({
                tgUserId, wonValue:0, lostValue: 0 
            });
            await tempDoc.save();
        }
        return true;
    } catch (err) {
        console.error("Failed to Saving New User: ", err.message);
        return false;
    }
}
