const constructorController = require('../controller/Constructor.Controller')
const express = require('express')
const router = express.Router()

router.get('/protected/test',constructorController.getContructor)

module.exports = router