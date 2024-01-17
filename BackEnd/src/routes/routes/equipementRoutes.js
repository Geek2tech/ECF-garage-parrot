const express = require('express')
const equipementController = require("../../controller/Equipement.Controller")
const router = express.Router()

// get List of equipement

router.get('/api/equipements',equipementController.getEquipements)

// Add an equipement

router.post('/api/protected/equipement',equipementController.addEquipement)

// Update Equipement

router.put('/api/protected/equipement',equipementController.updateEquipement)

// Delete Equipement

router.delete('/api/protected/equipement',equipementController.deleteEquipement)

module.exports = router
