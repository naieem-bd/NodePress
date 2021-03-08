// user, title, bio, profilePic, links: {fb, twi}, posts, bookmarks

const { Schema, model } = require('mongoose')
const User = require('./User')
const Post = require('./Post')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: Post
        }
    ]
}, {
    timestamps: true
})

const Profile = model('Profiel', profileSchema)
module.exports = Profile