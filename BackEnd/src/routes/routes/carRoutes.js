const carController = require('../../controller/Car.Controller')
const express = require('express')
const router = express.Router()

// get list of cars
router.post('/api/cars',carController.getCars)

// add Car
router.post('/api/protected/car',carController.addCar)

// delete car
router.delete('/api/car/:car_id',carController.deleteCar)

// get mmin max for filtering

router.get('/api/car/MinMax',carController.getMinMax)




module.exports = router