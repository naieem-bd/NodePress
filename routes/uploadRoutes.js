const router = require('express').Router()

const { isAuthenticated } = require('../middleware/authMiddleware')
const upload = require('../middleware/uploadMiddleware')

const { 
    uploadProfilePics,
    removeProfilePics
} = require('../controllers/uploadController')

router.post('/profilePics', 
    isAuthenticated, 
    upload.single('profilePics'), 
    uploadProfilePics )

router.delete('/profilePics', isAuthenticated, removeProfilePics)

module.exports = router