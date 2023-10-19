const carController = require('../../controller/Car.Controller')
const express = require('express')
const router = express.Router()

// get list of cars
router.get('/cars',carController.getCars)

// add Car
router.post('/protected/car',carController.addCar)

// delete car
router.delete('/car/:car_id',carController.deleteCar)

// get max price

router.get('/car/priceMinMax',carController.getPriceMinMax)

// get max mielage

router.get('/car/MileageMinMax',carController.getMileageMinMax)

// get max circulation year

router.get('/car/CirculationYearMinMax',carController.getCirculationYearMinMax)

module.exports = router