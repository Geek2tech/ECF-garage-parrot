const constructorController = require('../../controller/Constructor.Controller')
const express = require('express')
const router = express.Router()

// constructor list
router.get("/api/constructors", constructorController.getContructor)
// add a contructor
router.post('/api/protected/constructor', constructorController.addConstructor)
// update a constructor
router.put("/api/protected/constructor", constructorController.updateConstructor)
// delete a constructor
router.delete("/api/protected/constructor", constructorController.deleteConstructor)



module.exports = router
