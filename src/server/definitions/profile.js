// Import mongoose
const mongoose = require('mongoose')

// Data model for profiles
const ProfileSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    fname: {
        type: String,
        trim: true
    },
    lname: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        unique: false,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    avatar_ref: {
        type: String
    }
}, {
    collection: 'profile'
})

module.exports = mongoose.model('profile', ProfileSchema)