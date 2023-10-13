const express = require('express')
const commentController = require("../../controller/Comment.Controller")
const router = express.Router()

// get validated comment
router.get('/comments',commentController.getValidatedComment)

// get unvalidated comment
router.get('/protected/commentsPending',commentController.getUnvalidatedComment)

// Add comment
router.post('/comment',commentController.addComment)
// Delete comment
router.delete('/comment',commentController.deleteComment)

module.exports = router
