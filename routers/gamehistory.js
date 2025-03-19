const express = require("express")
const router = express.Router()
const GameHistoryController = require("../controller/gamehistory.controller")

router.post('/getgamehistory', GameHistoryController.getGameHistory);

module.exports = router