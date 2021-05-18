const moment = require('moment')

const Flash = require('../utils/Flash')
const Post = require('../models/Post')

function genDate(days) {
    let date = moment().subtract(days, 'days')
    return date.toDate()
}

function generateFilterObject(filter) {
    let filterObj = {}
    let order = 1

    switch(filter) {
        case 'week': {
            filterObj = {
                createdAt: {
                    $gt: genDate(7)
                }
            }
            order = -1
            break
        }
        case 'month': {
            filterObj = {
                createdAt: {
                    $gt: genDate(30)
                }
            }
            order = -1
            break
        }
        case 'all': {
            order = -1
            break
        }
    }

    return {
        filterObj,
        order
    }
}

exports.explorerGetController = async (req, res, next) => {

    let filter = req.query.filter || 'latest'

    let { order, filterObj } = generateFilterObject(filter.toLowerCase())

    try {
        let posts = await Post.find(filterObj)
            .populate('author', 'username')
            .sort(order === 1 ? '-createdAt' : 'createdAt')
            
        res.render('pages/explorer/explorer', {
            title: 'Explore all posts',
            filter,
            flashMessage: Flash.getMessage(req),
            posts
        })
    } catch(e) {
        next(e)
    }

}