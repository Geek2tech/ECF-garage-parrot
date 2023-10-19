const express = require('express')
const towingController = require("../../controller/Towing.Controller")
const router = express.Router()

// Get list of towing modes
router.get('/api/towings', towingController.getTowing)



module.exports = router