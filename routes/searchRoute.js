const router = require('express').Router()

const { searchResultGetController } = require('../controllers/searchController')

router.get('/', searchResultGetController)

module.exports = router