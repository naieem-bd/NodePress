const { body } = require('express-validator')
const User = require('../../models/User')

module.exports = [
    body('username')
        .isLength({ min:2, max:15 }).withMessage('user name must be 2 to 15 charecter')
        .custom(async username => {
            const user = await User.findOne({ username })
            if(user) {
                return Promise.reject('user name already used')
            }
        })
        .trim()
    ,
    body('email')
        .isEmail().withMessage('please provide a valid email')
        .custom(async email => {
            const user = await User.findOne({ email })
            if(user) {
                return Promise.reject('Email already used')
            }
        })
        .normalizeEmail()
    ,
    body('password')
        .isLength({ min:5 }).withMessage('password must be greater then 5 charecter')
    ,
    body('confirmPassword')
        .isLength({ min:5 }).withMessage('password must be greater then 5 charecter')
        .custom((confirmPassword, { req }) => {
            if(confirmPassword !== req,body.password) {
                throw new Error('password does not match')
            }
            return true
        })
]