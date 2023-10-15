const express = require('express')
const userController = require("../../controller/User.Controller")
const router = express.Router()

// get list of users
router.get('/protected/users',userController.getUser)

// add user
router.post('/protected/user',userController.addUser)

// update user information
router.put('/user',userController.updateUser)

// update user password
router.put('/password',userController.updateUserPassword)


//delete user
router.delete('/user',userController.deleteUser)




module.exports= router