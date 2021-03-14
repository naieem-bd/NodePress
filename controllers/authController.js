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
    res.render('pages/auth/login', { title: 'Login to you account' })
}

exports.loginPostController = async (req, res, next) => {
    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })
        if(!user) {
            return res.json({
                message: 'invalid email or password'
            })
        }

        let match = await bcrypt.compare(password, user.password)
        if(!match) {
            return res.json({
                message: 'invalid email or password'
            })
        }

        console.log('successfully logged in', user)
        res.render('pages/auth/login', {title: 'login to your account'})

    } catch(e) {

        console.log(e)
        next(e)

    }
}

exports.logoutController = (req, res, next) => {

}