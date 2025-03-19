const DatabaseController = require("./database.controller")

exports.getTokenByGame = async (req, res) => {
    try {
        const { tgUserId, balance, bet, stopCrash, profit } = req.body;
        const isSaved = await DatabaseController.updateTokenBalance(tgUserId, balance);
        await DatabaseController.saveGameHistory(tgUserId, bet, stopCrash, profit, balance);
        res.status(200).json({ message: isSaved });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message: ""});
    }
}

exports.getTokenByAccount = async (req, res) => {
    const { tgUserId, balance } = req.body;

    try {
        const isSaved = await DatabaseController.updateTokenBalance(tgUserId, balance);
        await DatabaseController.updateDailyClaimHistory(tgUserId);
        res.status(200).json({ message: isSaved });
    } catch (err) {
        res.status(200).json({ message: false });
        console.log(err.message);
    }
}

exports.getTokenBalance = async (req, res) => {
    try {
        const { tgUserId } = req.body;
        const tokenBalance = await DatabaseController.getTokenBalance(tgUserId);
        res.status(200).json({ message: tokenBalance });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 0 });
    }
}

exports.updateTokenBalance = async (req, res) => {
    try {
        const { tgUserId, tokenBalance } = req.body;
        const success = await DatabaseController.updateTokenBalance(tgUserId, tokenBalance);
        res.status(200).json({ message: success });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: false });
    }
}