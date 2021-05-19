const router = require('express').Router()

const { 
    explorerGetController,
    singlePostGetController
} = require('../controllers/exploreController')

router.get('/:postId', singlePostGetController)
router.get('/', explorerGetController)

module.exports = router