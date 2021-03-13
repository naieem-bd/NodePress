const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {title: 'Create a new account!'})
}

exports.signupPostController = async (req, res, next) => {
    
    const { username, email, password } = req.body
    
    try {
        let hashedPassword = await bcrypt.hash(password, 11)
    
        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createdUser = await user.save()
        console.log('user created successfully', createdUser)
        res.render('pages/auth/signup', {title: 'Create a new account!'})
    } catch(e) {
        console.log(e)
        next(e)
    }

}

exports.loginGetController = (req, res, next) => {

}

exports.loginPostController = (req, res, next) => {

}

exports.logoutController = (req, res, next) => {

}