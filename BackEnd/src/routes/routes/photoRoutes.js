const express = require('express')
const photoController = require("../../controller/Photos.Controller")
const router = express.Router()

//upload a file
router.post("/photo/:car_id", photoController.addPhoto)
//Download a file
router.get("/photo/:name", photoController.downloadPhoto)
//Suppress a file
router.delete("/photos/:car_id", photoController.deletePhotos)


module.exports =router