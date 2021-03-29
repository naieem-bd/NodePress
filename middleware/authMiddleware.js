const User = require('../models/User')

exports.bindUserWrithRequest = async () => {
    return (req, res, next) => {
        if(!req.session.isLoggedIn) {
            return next()
        }

        try {
            let user = User.findById(req.session.user._id)
            req.user = user
            next()
        } catch(e) {
            console.log(e)
            next(e)
        }
    }
}