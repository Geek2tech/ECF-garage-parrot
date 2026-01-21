const express = require('express')
const userController = require("../../controller/User.Controller")
const { passwordResetLimiter } = require("../../middleware/rateLimiter")
const router = express.Router()

// get list of users
router.get('/api/protected/users', userController.getUser)

// add user
router.post('/api/protected/user', userController.addUser)

// update user information
router.put('/api/protected/user', userController.updateUser)

// request an update user password (with rate limiting)
router.post('/api/password', passwordResetLimiter, userController.updateUserPassword)

// delete user
router.delete('/api/protected/user', userController.deleteUser)

// retrieve msm password
router.post('/api/msm', userController.getMsmMessage)


module.exports = router
