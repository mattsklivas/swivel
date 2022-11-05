// Import mongoose
const mongoose = require('mongoose')

// Data model for notifications
const NotifSchema = new mongoose.Schema({
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
    user_from_listing_id: { 
        type: String,
        required: true,
        trim: true
    },
    // Notification type (either 'offer' or 'accepted')
    type: {
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'notifications'
})

module.exports = mongoose.model('notif', NotifSchema)