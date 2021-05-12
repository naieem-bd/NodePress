const router = require('express').Router()

const { explorerGetController } = require('../controllers/exploreController')

router.get('/', explorerGetController)

module.exports = router