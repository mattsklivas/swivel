// Import mongoose
const mongoose = require('mongoose')

// collection and schema for Users
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
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'user'
})

module.exports = mongoose.model('user', UserSchema)