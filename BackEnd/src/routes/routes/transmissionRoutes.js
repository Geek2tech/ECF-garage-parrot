const express = require('express')
const transmissionController = require("../../controller/Transmission.Controller")
const router = express.Router()

// Get list of transmission type
router.get('/api/transmissions', transmissionController.getTransmission)


module.exports = router
