const express = require('express')
const commentController = require("../../controller/Comment.Controller")
const { commentLimiter } = require("../../middleware/rateLimiter")
const router = express.Router()

// get validated comment
router.get('/api/comments', commentController.getValidatedComment)

// get unvalidated comment
router.get('/api/protected/commentsPending', commentController.getUnvalidatedComment)

// Add comment (with rate limiting to prevent spam)
router.post('/api/comment', commentLimiter, commentController.addComment)

// Delete comment
router.delete('/api/protected/comment', commentController.deleteComment)

// validate comment
router.put('/api/protected/comment', commentController.validateComment)

module.exports = router
