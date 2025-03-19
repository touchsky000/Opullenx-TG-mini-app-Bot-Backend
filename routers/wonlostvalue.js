const express = require("express")
const router = express.Router()
const wonLostValueController = require("../controller/wonlostvalue.controller")

router.post('/getwonlostvalue', wonLostValueController.getWonLostValue);
router.post('/setwonlostvalue', wonLostValueController.setWonLostValue);

module.exports = router