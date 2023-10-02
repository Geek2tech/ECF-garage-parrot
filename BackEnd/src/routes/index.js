const express = require("express");
const router = express.Router();
const mailController = require("../controller/Mail.Controller")
const fileController = require("../controller/File.Controller")

let routes = (app) => {

    router.get("/files/:name", fileController.download)

    router.post("/mail",mailController.sendmail)


    router.post("/upload/:name",fileController.upload)

    app.use(router);
};

module.exports = routes;
