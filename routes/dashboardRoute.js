const router = require('express').Router()

const { isAuthenticated } = require('../middleware/authMiddleware')

const { dashboardGetController } = require('../controllers/dashboardController')

router.get('/', isAuthenticated, dashboardGetController)

module.exports = router