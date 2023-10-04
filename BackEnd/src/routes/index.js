const express = require("express");
const router = express.Router();
const mailController = require("../controller/Mail.Controller")
const fileController = require("../controller/File.Controller")
const constructorController = require('../controller/Constructor.Controller')
let routes = (app) => {

    router.get("/file/:name", fileController.download)
    router.get("/constructors", constructorController.constructorList)

    router.post("/mail", mailController.sendMail)
    router.post("/delete/:name", fileController.deleteFile)
    router.post("/upload/:name", fileController.upload)
    router.post('/constructor', constructorController.addConstructor)

    router.put("/constructor", constructorController.constructorUpdate)




    app.use(router);
};

module.exports = routes;
