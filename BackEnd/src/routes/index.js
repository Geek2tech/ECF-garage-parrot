const express = require("express");
const router = express.Router();
const mailController = require("../controller/Mail.Controller")
const fileController = require("../controller/File.Controller")

let routes = (app) => {

    router.get("/files/:name", fileController.download)

    router.post("/mail",(req,res) => {
        mailController.sendMail(req,res)
    })

    router.post("/upload",fileController.upload)

    app.use(router);
};

module.exports = routes;
