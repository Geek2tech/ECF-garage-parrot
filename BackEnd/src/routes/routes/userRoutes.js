const express = require('express')
const userController = require("../../controller/User.Controller")
const router = express.Router()

// get list of users
router.get('/protected/users',userController.getUser)

// add user
router.post('/user',userController.addUser)

// update user
router.put('/user',userController.updateUser)

//delete user
router.delete('/user',userController.deleteUser)



module.exports= router