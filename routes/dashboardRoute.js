const router = require('express').Router()

const { dashboardGetController } = require('../controllers/dashboardController')

router.get('/', dashboardGetController)

module.exports = router