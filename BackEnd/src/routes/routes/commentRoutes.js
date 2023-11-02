const express = require('express')
const commentController = require("../../controller/Comment.Controller")
const router = express.Router()

// get validated comment
router.get('/api/comments',commentController.getValidatedComment)

// get unvalidated comment
router.get('/api/protected/commentsPending',commentController.getUnvalidatedComment)

// Add comment
router.post('/api/comment',commentController.addComment)
// Delete comment
router.delete('/api/protected/comment',commentController.deleteComment)

module.exports = router
