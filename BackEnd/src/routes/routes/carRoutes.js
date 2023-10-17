const carController = require('../../controller/Car.Controller')
const express = require('express')
const router = express.Router()

// get list of cars
router.get('/cars',carController.getCars)

// add Car
router.post('/car',carController.addCar)

// update car

router.put('/car',carController.updateCar)

// delete car
router.delete('./car',carController.deleteCar)

module.exports = router