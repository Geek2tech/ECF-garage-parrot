const express = require('express')
const servicesController = require("../../controller/Services.Controller")
const router = express.Router()

// Get list of services
router.get('/api/services', servicesController.getServices)
// Add a services
router.post('/protected/service', servicesController.addServices)
// Update a service
router.put('/protected/service', servicesController.updateServices)
// Delete a service
router.delete('/protected/service', servicesController.deleteServices)



module.exports = router
