// Name, Email, Password, profile

const { Schema, model } = require('mongoose')
const Profile = require('./Profile')

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User