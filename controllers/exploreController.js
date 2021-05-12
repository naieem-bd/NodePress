const Flash = require('../utils/Flash')

exports.explorerGetController = (req, res, next) => {
    res.render('pages/explorer/explorer', {
        title: 'Explore all posts',
        filter: 'latest',
        flashMessage: Flash.getMessage(req)
    })
}