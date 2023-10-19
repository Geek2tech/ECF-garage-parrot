const constructorController = require('../../controller/Constructor.Controller')
const express = require('express')
const router = express.Router()

// constructor list
router.get("/api/constructors", constructorController.getContructor)
// add a contructor
router.post('/protected/constructor', constructorController.addConstructor)
// update a constructor
router.put("/protected/constructor", constructorController.updateConstructor)



module.exports = router