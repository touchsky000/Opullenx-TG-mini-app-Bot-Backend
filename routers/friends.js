const express = require("express")
const router = express.Router()
const FriendController = require("../controller/friends.controller")

router.post('/getfriendlist', FriendController.getFriendList);
router.post('/getfriendnumber', FriendController.getFriendNumber);

module.exports = router