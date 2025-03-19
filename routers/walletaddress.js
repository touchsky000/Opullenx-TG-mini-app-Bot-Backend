const express = require("express")
const router = express.Router()
const walletAddressController = require("../controller/walletaddress.controller")

router.post("/setwalletaddress", walletAddressController.setWalletAddress)
router.post("/walletaddress", walletAddressController.walletAddress)
router.post("/faucet", walletAddressController.faucet)

module.exports = router