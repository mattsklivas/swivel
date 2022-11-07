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
    // Listing ID of the user which the notification belongs to
    user_listing_id: { 
        type: String,
        required: true,
        trim: true
    },
    // Listing title of the user which the notification belongs to
    user_listing_title: { 
        type: String,
        required: true,
        trim: true
    },
    // Listing ID of the user which initiated the notification
    user_from_listing_id: { 
        type: String,
        required: true,
        trim: true
    },
    // Listing title of the user which initiated the notification
    user_from_listing_title: { 
        type: String,
        required: true,
        trim: true
    },
    // Notification type (either 'offer', 'rescind' or 'accepted')
    type: {
        type: String,
        required: true,
        trim: true
    },
    // Flag for whether the notification has been seen or not
    seen: {
        type: Boolean,
        default: false
    }
}, {
    collection: 'notification'
})

module.exports = mongoose.model('notification', NotificationSchema)