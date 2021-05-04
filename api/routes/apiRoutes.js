const router = require('express').Router()
const { isAuthenticated } = require('../../middleware/authMiddleware')

const {
    commentPostController,
    replyCommentPostController
} = require('../controllers/commentController')

router.post('/comments/:postId', isAuthenticated, commentPostController)
router.post('/comments/replies/:commentId', isAuthenticated, replyCommentPostController)

router.get('/likes/:postId', isAuthenticated, (req, res) => {})
router.get('/dislikes/:postId', isAuthenticated, (req, res) => {})

module.exports = router