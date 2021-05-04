const router = require('express').Router()
const { isAuthenticated } = require('../../middleware/authMiddleware')

const {
    commentPostController,
    replyCommentPostController
} = require('../controllers/commentController')

const {
    likesGetController,
    dislikesGetController
} = require('../controllers/likeDislikeController')

router.post('/comments/:postId', isAuthenticated, commentPostController)
router.post('/comments/replies/:commentId', isAuthenticated, replyCommentPostController)

router.get('/likes/:postId', isAuthenticated, likesGetController)
router.get('/dislikes/:postId', isAuthenticated, dislikesGetController)

module.exports = router