const router = require('express').Router()

const postValidator = require('../validator/dashboard/post/postValidator')
const { isAuthenticated } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

const {
    createPostGetController,
    createPostPostController
} = require('../controllers/postController')

router.get('/create', createPostGetController)
router.post('/create', isAuthenticated, upload.single('post-thumbnail'), postValidator, createPostPostController)

module.exports = router