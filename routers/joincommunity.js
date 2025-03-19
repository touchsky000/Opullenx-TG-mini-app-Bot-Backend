const express = require("express");
const router = express.Router();
const JoinCommunityController = require("../controller/joincommunity.controller");

router.post("/setjoincommunity", JoinCommunityController.setJoinCommunity);
router.post("/getjoincommunity", JoinCommunityController.getJoinCommunity);
router.post("/checktelegram", JoinCommunityController.checkTelegram);

module.exports = router;
