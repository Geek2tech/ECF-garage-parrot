const express = require("express");
const router = express.Router();
const mailController = require("../controller/Mail.Controller")
const fileController = require("../controller/File.Controller")
const constructorController = require('../controller/Constructor.Controller')
let routes = (app) => {

    router.get("/files/:name", fileController.download)

    router.post("/mail",mailController.sendMail)


    router.post("/upload/:name",fileController.upload)
    router.post('/constructor',constructorController.addConstructor)

    app.use(router);
};

module.exports = routes;
