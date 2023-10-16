const express = require('express')
const photoController = require("../../controller/Photos.Controller")
const router = express.Router()

//get photo list
router.get('/photos',photoController.getPhotos)
//upload a file
router.post("/protected/photo/:car_id", photoController.addPhoto)
//Download a file
router.get("/photo/:name", photoController.downloadPhoto)
//Suppress a file
router.delete("/protected/photos/:car_id", photoController.deletePhotos)


module.exports =router