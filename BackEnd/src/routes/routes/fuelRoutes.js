const express = require('express')
const fuelController = require("../../controller/Fuel.Controller")
const router = express.Router()

// list of fuel
router.get('/api/fuels', fuelController.getFuel)
// add a fuel
router.post('/api/protected/fuel', fuelController.addFuel)
// update fuel
router.put('/api/protected/fuel', fuelController.updateFuel)


module.exports = router