const GameHistoryModel = require("../models/gamehistory");
const DatabaseController = require("./database.controller");

exports.getGameHistory = async (req, res) => {
  try {
    const { tgUserId } = req.body;
    const existUser = await DatabaseController.existTgUser(tgUserId);

    if (!existUser) {
      res.status(200).json({ message: "", content: "user is not existed" });
    } else {
        const now = new Date();
        const utcYear = now.getUTCFullYear();
        const utcMonth = now.getUTCMonth();
        const utcDay = now.getUTCDate();
        const today = new Date(Date.UTC(utcYear, utcMonth, utcDay, 0, 0, 0, 0))

        const tempHistory = await GameHistoryModel.deleteMany({ tgUserId, date: {$lt: today}});
        const todayHistory = await GameHistoryModel.find({
            tgUserId,
            date: { $gte: today }
        });
        console.log("today", today);
        
        res.status(200).json({ message: todayHistory });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "" });
  }
};
