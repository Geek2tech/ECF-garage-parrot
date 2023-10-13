const express = require('express')
const commentController = require("../../controller/Comment.Controller")
const router = express.Router()

// get validated comment
router.get('/commentsvalidated',commentController.getValidatedComment)


module.exports = router
