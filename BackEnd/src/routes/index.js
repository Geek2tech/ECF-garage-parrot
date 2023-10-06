const express = require("express");
const router = express.Router();
const mailController = require("../controller/Mail.Controller")
const fileController = require("../controller/File.Controller")
const constructorController = require('../controller/Constructor.Controller')
const checkApiKey = require('../middleware/checkApiKey')

let routes = (app) => {

    router.get("/file/:name", checkApiKey,(req,res)=> {
        fileController.download(req,res)
    })

    router.get("/constructors", checkApiKey,(req,res) => {
        constructorController.constructorList(req,res)
    })

    router.post("/mail", checkApiKey,(req,res) => {
        mailController.sendMail(req,res)
    })

    router.post("/delete/:name", checkApiKey,(req,res) => {
        fileController.deleteFile(req,res)
    })
    router.post("/upload/:name", checkApiKey,(req,res) => {
        fileController.upload(req,res)
    })
    router.post('/constructor',checkApiKey,(req,res) => {
        constructorController.addConstructor(req, res)
    })
    router.put("/constructor", checkApiKey,(req,res) => {
        constructorController.constructorUpdate(req,res)
    })

    app.use(router)
    }

module.exports = routes
