const express = require('express')
const equipementController = require("../../controller/Equipement.Controller")
const router = express.Router()

// get List of equipement

router.get('/api/equipements',equipementController.getEquipements)

// Add an equipement

router.post('/protected/equipement',equipementController.addEquipement)

// Update Equipement

router.put('/protected/equipement',equipementController.updateEquipement)

module.exports = router