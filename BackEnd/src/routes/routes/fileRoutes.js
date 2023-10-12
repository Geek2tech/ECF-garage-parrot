const express = require('express')
const fileController = require("../../controller/File.Controller")
const router = express.Router()

//upload a file
router.post("/protected/upload/:name", fileController.upload)
//Download a file
router.get("/file/:name", fileController.download)
//Suppress a file
router.delete("/protected/file/:name", fileController.deleteFile)


module.exports =router