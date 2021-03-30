const User = require('../models/User')

exports.bindUserWrithRequest = () => {
    return async (req, res, next) => {
        if(!req.session.isLoggedIn) {
            return next()
        }

        try {
            let user = await User.findById(req.session.user._id)
            req.user = user
            next()
        } catch(e) {
            console.log(e)
            next(e)
        }
    }
}