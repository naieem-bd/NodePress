const router = require('express').Router()
const {check, validationResult} = require('express-validator')

const Flash = require('../utils/Flash')

router.get('/validator', (req, res, next) => {

    console.log(Flash.getMessage(req))

    res.render('playground/signup', {title: 'validator from palyground'})
})

router.post('/validator',
[
    check('username')
        .not()
        .isEmpty()
        .withMessage('plz enter username')
        .isLength({max: 15})
        .withMessage('you can not enter more then 15 character')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('plz provide a valide email')
        .normalizeEmail(),
    check('password').custom(value => {
        if(value.length < 5) {
            throw new Error('password must be greater then 25 character')
        }
        return true
    }),
    check('confirmPassword').custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error('password does not match')
        }
        return true
    })
],
(req, res, next) => {
    let errors = validationResult(req)

    if(!errors.isEmpty()) {
        req.flash('fail', 'there is some error')
    } else {
        req.flash('success', 'there is no error')
    }

    res.redirect('/playground/validator')

})

module.exports = router