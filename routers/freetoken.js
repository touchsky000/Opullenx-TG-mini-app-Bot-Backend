const express = require("express");
const FreeTokenController = require("../controller/freetoken.controller");
const router = express.Router();

router.post('/currentbalance', FreeTokenController.getTokenBalance);
router.post('/gettokenbygame', FreeTokenController.getTokenByGame);
router.post('/gettokenbyaccount', FreeTokenController.getTokenByAccount);
router.post('/updatetokenbalance', FreeTokenController.updateTokenBalance);

module.exports = router;