const express = require("express")
const router = express.Router()
const DailyClaimHistoryController = require("../controller/dailyclaimhistory.controller");

module.exports = router

router.post('/getupdaterecentdate', DailyClaimHistoryController.getUpdateRecentDate);
router.post('/getdailyclaim', DailyClaimHistoryController.getDailyClaim);
router.post('/getserverdate', DailyClaimHistoryController.getServerDate);

module.exports = router;