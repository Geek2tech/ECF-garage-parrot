const express = require('express')
const mailController = require("../../controller/Mail.Controller");
const router = express.Router()


 // send mail
router.post("/mail", mailController.sendMail)

module.exports = router