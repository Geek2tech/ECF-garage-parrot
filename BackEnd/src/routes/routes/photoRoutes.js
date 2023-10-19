const express = require('express')
const photoController = require("../../controller/Photos.Controller")
const router = express.Router()

//get photo list
router.get('/api/photos/:car_id',photoController.getPhotos)
//upload a file
router.post("/api/protected/photo/:car_id/:primary", photoController.addPhoto)
//Download a file
router.get("/photo/:name", photoController.downloadPhoto)




module.exports =router