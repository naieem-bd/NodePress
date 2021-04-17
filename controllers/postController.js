const Flash = require('../utils/Flash')

exports.createPostGetController = (req, res, next) => {
    res.render('pages/dashboard/post/createPost', {
        title: 'Create a new post',
        error: {},
        flashMessage: Flash.getMessage(req)
    })
}

exports.createPostPostController = (req, res, next) => {
    res.render('pages/dashboard/post/createPost', {
        title: 'Create a new post',
        error: {},
        flashMessage: Flash.getMessage(req)
    })
}