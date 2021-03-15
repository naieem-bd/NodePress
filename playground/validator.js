const router = require('express').Router()
const {check, validationResult} = require('express-validator')

router.get('/validator', (req, res, next) => {
    res.render('playground/signup', {title: 'validator from palyground'})
})

router.post('/validator',
[
    check('username')
        .not()
        .isEmpty()
        .withMessage('plz enter username')
        .isLength({max: 15})
        .withMessage('you can not enter more then 15 character'),
    check('email')
        .isEmail()
        .withMessage('plz provide a valide email')
],
(req, res, next) => {
    let errors = validationResult(req)

    const formatter = (error) => error.msg 

    // console.log(errors.isEmpty())
    // console.log(errors.array())
    // console.log(errors.mapped())

    console.log(errors.formatWith(formatter).mapped());

    res.render('playground/signup', {title: 'validator from palyground'})
})

module.exports = router