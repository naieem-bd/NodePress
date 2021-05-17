const Flash = require('../utils/Flash')
const Post = require('../models/Post')

exports.explorerGetController = async (req, res, next) => {

    try {
        let posts = await Post.find()
        res.render('pages/explorer/explorer', {
            title: 'Explore all posts',
            filter: 'latest',
            flashMessage: Flash.getMessage(req),
            posts
        })
    } catch(e) {
        next(e)
    }

}