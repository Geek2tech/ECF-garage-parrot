const express = require('express')
const carEquipementsController = require("../../controller/CarEquipement.Controller")
const router = express.Router()

// get list of equipements
router.get('/api/carEquipements' , carEquipementsController.getCarEquipements)

// Add a car equipements
router.post('/protected/carEquipement',carEquipementsController.addCarEquipements)

// Delete an car equipements
router.delete('/protected/carEquipement',carEquipementsController.deleteCarEquipements)

module.exports = router
