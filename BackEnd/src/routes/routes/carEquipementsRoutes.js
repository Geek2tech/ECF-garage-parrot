const express = require('express')
const carEquipementsController = require("../../controller/CarEquipement.Controller")
const router = express.Router()

// get list of equipements
router.post('/api/carEquipements' , carEquipementsController.getCarEquipements)

// Add a car equipements
router.post('/api/protected/carEquipement',carEquipementsController.addCarEquipements)

// Delete an car equipements
router.delete('/api/protected/carEquipement',carEquipementsController.deleteCarEquipements)

module.exports = router
