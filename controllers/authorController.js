const Flash = require('../utils/Flash')

const User = require('../models/User')

exports.authorProfileGetController = async (req, res, next) => {

    let userId = req.params.userId

    try {
        let author = await User.findById(userId)
        .populate({
            path: 'profile',
            populate: {
                path: 'posts'
            }
        })

        res.render('pages/explorer/author', {
            title: 'Author Page',
            flashMessage: Flash.getMessage(req),
            author
        })

    } catch(e) {
        next(e)
    }

}