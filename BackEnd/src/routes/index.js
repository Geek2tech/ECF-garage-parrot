const express = require("express");
const router = express.Router();
const mailController = require("../controller/Mail.Controller")
const fileController = require("../controller/File.Controller")
const constructorController = require('../controller/Constructor.Controller')
const fuelController = require('../controller/Fuel.Controller')
const profilController = require('../controller/Profil_Controller')
const userController = require('../controller/Auth.controller')
const openningController = require('../controller/Opening.Controller')
const servicesController = require('../controller/Services.Controller')
const towingController = require('../controller/Towing.Controller')
const transmissionController = require('../controller/Transmission.Controller')
const checkApiKey = require('../middleware/checkApiKey')
const checkAuth = require('../middleware/checkAuth')

let routes = (app) => {

    app.all('/*', checkApiKey)
    app.all('/protected/*', checkAuth)
    //Route GET

    router.get('/test', constructorController.getContructor)

    router.get("/file/:name", (req, res) => {
        fileController.download(req, res)
    })

    router.get("/constructors", constructorController.getContructor)

    router.get('/fuels', fuelController.getFuel)

    router.get('/protected/profils', profilController.getProfil)

    router.get('/openinghours', openningController.getOpeningHours)

    router.get('/services', servicesController.getServices)

    router.get('/towings', towingController.getTowing)

    router.get('/transmissions', transmissionController.getTransmission)

    // Route POST

    router.post("/mail", mailController.sendMail)


    router.post("/protected/upload/:name", fileController.upload)

    router.post('/protected/constructor', constructorController.addConstructor)

    router.post('/protected/fuel', fuelController.addFuel)

    router.post('/login', userController.authentification)

    router.post('/protected/service', servicesController.addServices)


    // Route PUT

    router.put("/protected/constructor", constructorController.updateConstructor)

    router.put('/protected/fuel', fuelController.updateFuel)

    router.put('/protected/opening', openningController.updateOpenningHours)

    router.put('/protected/service', servicesController.updateServices)

    //route delete

    router.delete('/protected/service', servicesController.deleteServices)

    router.delete("/protected/file/:name", fileController.deleteFile)

    app.use(router)
}

module.exports = routes
