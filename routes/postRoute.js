const router = require('express').Router()

const {
    createPostGetController,
    createPostPostController
} = require('../controllers/postController')

router.get('/create', createPostGetController)
router.post('/create', createPostPostController)

module.exports = router