const express = require('express')
const authController = require("../../controller/Auth.controller")
const { authLimiter } = require("../../middleware/rateLimiter")
const router = express.Router()

// Login request (with rate limiting)
router.post('/api/login', authLimiter, authController.authentification)


module.exports = router