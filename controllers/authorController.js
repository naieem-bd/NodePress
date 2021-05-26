const Flash = require('../utils/Flash')

const User = require('../models/User')

// const Profile = require('../models/Profile')

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

        // let profileId = author.profile
        // let profile_info = await Profile.findById(profileId)
        //     .populate({
        //         path: 'profiel',
        //         populate: {
        //             path: 'posts'
        //         }
        //     })
        
        
        console.log('ddddddddddddddddddddddddddddd' + author)

        res.render('pages/explorer/author', {
            title: 'Author Page',
            flashMessage: Flash.getMessage(req),
            author
        })

    } catch(e) {
        next(e)
    }

}