// Import mongoose
const mongoose = require('mongoose')

// Data model for notifications
const NotificationSchema = new mongoose.Schema({
    // User for which the notification is sent to
    user_to: {
        type: String,
        required: true,
        trim: true
    },
    // User who's action created a notification
    user_from: {
        type: String,
        required: true,
        trim: true
    },
    user_listing_id: { 
        type: String,
        required: true,
        trim: true
    },
    user_listing_title: { 
        type: String,
        required: true,
        trim: true
    },
    user_from_listing_id: { 
        type: String,
        required: true,
        trim: true
    },
    user_from_listing_title: { 
        type: String,
        required: true,
        trim: true
    },
    // Notification type (either 'offer' or 'accepted')
    type: {
        type: String,
        required: true,
        trim: true
    },
    seen: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'notification'
})

module.exports = mongoose.model('notification', NotificationSchema)