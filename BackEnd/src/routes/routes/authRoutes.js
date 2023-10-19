const express = require('express')
const authController = require("../../controller/Auth.controller")
const router = express.Router()

// Login request
router.post('/api/login', authController.authentification)


module.exports = router