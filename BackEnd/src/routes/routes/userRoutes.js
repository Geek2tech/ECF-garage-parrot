const express = require('express')
const userController = require("../../controller/User.Controller")
const router = express.Router()

// get list of users
router.get('/api/protected/users',userController.getUser)

// add user
router.post('/api/protected/user',userController.addUser)

// update user information
router.put('/api/user',userController.updateUser)

// request an update user password
router.post('/api/password',userController.updateUserPassword)


//delete user
router.delete('/api/protected/user',userController.deleteUser)




module.exports= router