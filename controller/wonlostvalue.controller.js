const WonLostValueModel = require("../models/wonlostvalue");
const DatabaseController = require("./database.controller");

exports.getWonLostValue = async (req, res) => {
  console.log("234234324", "tempDoc");
  try {
    const { tgUserId } = req.body;
    console.log("getWonLostValue", tgUserId);

    const temp = await WonLostValueModel.findOne({ tgUserId });
    console.log("getWonLostValue", await temp);
    res
      .status(200)
      .json({
        message: { wonValue: temp.wonValue, lostValue: temp.lostValue },
      });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "" });
  }
};

exports.setWonLostValue = async (req, res) => {
  console.log("setwonlostvalue", req.body.tgUserId);

  try {
    const { tgUserId, wonValue, lostValue } = req.body;
    const flag = await DatabaseController.saveWonLostValue(
      tgUserId,
      wonValue,
      lostValue
    );
    res.status(200).json({ message: flag });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: false });
  }
};
