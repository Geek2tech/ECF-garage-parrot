const express = require("express");
const router = express.Router();
const mailController = require("../controller/Mail.Controller")

let routes = (app) => {

    router.post('/mail',(req,res) => {
        mailController.sendMail(req,res)
    })

    app.use(router);
};

module.exports = routes;
