const express = require('express')
const openningController = require("../../controller/Opening.Controller")
const router = express.Router()

// Get list of opening hours
router.get('/api/openinghours', openningController.getOpeningHours)
// Update opening hours
router.put('/protected/opening', openningController.updateOpenningHours)


module.exports = router