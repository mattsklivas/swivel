// Import mongoose
const mongoose = require('mongoose')

// Data model for chat messages
const MessageSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    collection: 'message'
})

module.exports = mongoose.model('message', MessageSchema)