const { validationResult } = require('express-validator')
const Flash = require('../utils/Flash')
const User = require('../models/User')
const Profile = require('../models/Profile')
const errorFormatter = require('../utils/validationErrorFormatter')

exports.dashboardGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id })
        if(profile) {
            return res.render('pages/dashboard/dashboard', {
                title: 'my dashboard',
                flashMessage: Flash.getMessage(req)
            })
        }

        res.redirect('/dashboard/create-profile')

    } catch(e) {
        next(e)
    }

}

exports.createProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({ user: req.user._id })
        if(profile) {
            return res.redirect('/dashboard/edit-profile')
        }

        res.render('pages/dashboard/create-profile', { 
            title: 'Create your profile', 
            flashMessage: Flash.getMessage(req),
            error: {}
        })

    } catch(e) {
        next(e)
    }
}

exports.createProfilePostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)

    if(!errors.isEmpty()) {
        return res.render('pages/dashboard/create-profile', { 
            title: 'Create your profile', 
            flashMessage: Flash.getMessage(req),
            error: errors.mapped()
        })
    }

    let {
        name,
        title,
        bio,
        website,
        facebook,
        twitter,
        github
    } = req.body
    // let profilePics = req.user.profilePics
    // let posts = []
    // let bookmarks = []

    try {
        let profile = new Profile({
            user: req.user._id,
            name,
            title,
            bio,
            profilePics: req.user.profilePics,
            links: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || ''
            },
            posts: [],
            bookmarks: []
        })

        let createdProfile = await profile.save()
        await User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: { profile: createdProfile._id } }
        )

        req.flash('success', 'Profile created successfully')
        res.redirect('/dashboard')

    } catch(e) {
        next(e)
    }
}

exports.editProfileGetController = async (req, res, next) => {
    next()
}

exports.editProfilePostController = async (req, res, next) => {
    next()
}