const express = require('express')
const userController = require("../../controller/User.Controller")
const router = express.Router()

// get list of users
router.get('/protected/users',userController.getUser)

// add user
router.post('/user',userController.addUser)

// update user information
router.put('/protected/user',userController.updateUser)

// request an update user password
router.post('/password',userController.updateUserPassword)


//delete user
router.delete('/user',userController.deleteUser)




module.exports= router