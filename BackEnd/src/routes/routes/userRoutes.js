const express = require('express')
const userController = require("../../controller/User.Controller")
const router = express.Router()

// get list of users
router.get('/protected/users',userController.getUser)

// add user
router.post('/protected/user',userController.addUser)

// update user information
router.put('/protected/user',userController.updateUser)

// request an update user password
router.post('/api/password',userController.updateUserPassword)


//delete user
router.delete('/protected/user',userController.deleteUser)




module.exports= router