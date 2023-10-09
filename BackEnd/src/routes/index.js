const express = require("express");
const router = express.Router();
const mailController = require("../controller/Mail.Controller")
const fileController = require("../controller/File.Controller")
const constructorController = require('../controller/Constructor.Controller')
const fuelController = require('../controller/Fuel.Controller')
const profilController = require('../controller/Profil_Controller')
const userController = require('../controller/User.controller')
const checkApiKey = require('../middleware/checkApiKey')
const checkJwt = require('../middleware/checkJWT')

let routes = (app) => {


    //Route GET

    router.get("/file/:name", checkApiKey,(req,res)=> {
        fileController.download(req,res)
    })

    router.get("/constructors", checkApiKey,(req,res) => {
        constructorController.getContructor(req,res)
    })

    router.get('/fuels' , checkApiKey,(req,res) => {
        fuelController.getFuel(req,res)
    })

    router.get('/profils', checkApiKey,(req,res) => {
        profilController.getProfil(req,res)
    })

    // Route POST

    router.post("/mail", checkApiKey,(req,res) => {
        mailController.sendMail(req,res)
    })

    router.post("/delete/:name", checkApiKey,checkJwt,(req,res) => {
        fileController.deleteFile(req,res)
    })
    router.post("/upload/:name", checkApiKey,checkJwt,(req,res) => {
        fileController.upload(req,res)
    })
    router.post('/constructor',checkApiKey,checkJwt,(req,res) => {
        constructorController.makeConstructor(req, res)
    })
    router.post('/fuel',checkApiKey,checkJwt,(req,res) => {
        fuelController.makeFuel(req,res)
    })
router.post('/login',checkApiKey,(req,res) => {
    userController.authentification(req,res)
})



    // Route PUT

    router.put("/constructor", checkApiKey,(req,res) => {
        constructorController.updateConstructor(req,res)
    })

    router.put('/fuel',checkApiKey,(req,res)=>{
        fuelController.updateFuel(req,res)
    })

    app.use(router)
    }

module.exports = routes
