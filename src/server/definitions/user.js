// Import mongoose
const mongoose = require('mongoose')

// Data model for user login info
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
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
    avatar: {
        data: Buffer,
        contentType: String
    },
    saved_listings: [String]
}, {
    collection: 'user'
})

module.exports = mongoose.model('user', UserSchema)