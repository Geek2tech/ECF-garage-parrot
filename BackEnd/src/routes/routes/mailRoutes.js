const express = require('express')
const mailController = require("../../controller/Mail.Controller")
const { mailLimiter } = require("../../middleware/rateLimiter")
const router = express.Router()

// send mail (with rate limiting to prevent spam)
router.post("/api/mail", mailLimiter, mailController.sendMail)

module.exports = router