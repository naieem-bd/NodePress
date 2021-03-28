const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const User = require('../models/User')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {title: 'Create a new account!', error: {}, value: {}})
}

exports.signupPostController = async (req, res, next) => {
    let { username, email, password } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return res.render('pages/auth/signup', {
            title: 'Create a new account!', 
            error: errors.mapped(),
            value: {
                username, email, password
            }
        })
    }
    
    
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
    // let isLoggedIn = req.get('Cookie').includes('isLoggedIn=true') ? true : false
    res.render('pages/auth/login', { title: 'Login to you account', error: {}, isLoggedIn:false })
}

exports.loginPostController = async (req, res, next) => {
    const { email, password } = req.body

    // let isLoggedIn = req.get('Cookie').includes('isLoggedIn=true') ? true : false
    res.render('pages/auth/login', { title: 'Login to you account', error: {}, isLoggedIn:false })    

    let errors = validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){
        return res.render('pages/auth/login', {
            title: 'login to your account', 
            error: errors.mapped(),
            isLoggedIn
        })
    }    

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

        res.setHeader('Set-Cookie', 'isLoggedIn=true')
        res.render('pages/auth/login', {title: 'login to your account', error: {}, isLoggedIn:false })

    } catch(e) {

        console.log(e)
        next(e)

    }
}

exports.logoutController = (req, res, next) => {

}