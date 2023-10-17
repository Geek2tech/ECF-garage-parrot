const express = require('express')
const photoController = require("../../controller/Photos.Controller")
const router = express.Router()

//get photo list
router.get('/photos',photoController.getPhotos)
// get Primary photo
router.get('/primary/:car_id',photoController.getPrimaryPhoto)
//upload a file
router.post("/protected/photo/:car_id/:primary", photoController.addPhoto)
//Download a file
router.get("/photo/:name", photoController.downloadPhoto)



module.exports =router