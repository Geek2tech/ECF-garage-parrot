const express = require('express')
const profilController = require("../../controller/Profil_Controller")
const router = express.Router()

// list of profil
router.get('/protected/profils', profilController.getProfil)



module.exports =router