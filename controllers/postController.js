const { validationResult } = require('express-validator')
const readingTime = require('reading-time')

const Flash = require('../utils/Flash')
const errorFormatter = require('../utils/validationErrorFormatter')

const Post = require('../models/Post')
const Profile = require('../models/Profile')

exports.createPostGetController = (req, res, next) => {
    res.render('pages/dashboard/post/createPost', {
        title: 'Create a new post',
        error: {},
        flashMessage: Flash.getMessage(req),
        value: {}
    })
}

exports.createPostPostController = async (req, res, next) => {
    let { title, body, tags } = req.body
    let errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()) {
        res.render('pages/dashboard/post/createPost', {
            title: 'Create a new post',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req),
            value: {
                title,
                body,
                tags
            }
        })        
    }

    if(tags) {
        tags = tags.split(',')
    }

    let readTime = readingTime(body).text

    let post = new Post({
        title,
        body,
        tags,
        author: req.user._id,
        thumbnail: '',
        readTime,
        likes: [],
        dislikes: [],
        comments: []
    })

    if(req.file) {
        post.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        let createdPost = await post.save()
        await Profile.findOneAndUpdate(
            { user: req.user._id },
            { $push: { 'posts': createdPost._id } }
        )
        req.flash('success', 'Post created successfully')
        return res.redirect(`/posts/edit/${createdPost._id}`)
    } catch(e) {
        next(e)
    }
}