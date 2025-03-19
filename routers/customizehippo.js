const express = require("express")
const router = express.Router()
const HippoInfoController = require("../controller/hippoinfo.controller")

router.post('/sethippoinfo', HippoInfoController.setHippoInfo);
router.post('/gethippoinfo', HippoInfoController.getHippoInfo);

module.exports = router