// Import mongoose
const mongoose = require('mongoose')

// Data model for user login info
const NotifSchema = new mongoose.Schema({
    primaryUser: { // primary user name
        type: String,
        required: true,
        trim: true
    },                 
    primaryUserOffer: {  // user offer title
        type: String,
        required: true,
        trim: true
    },
    primaryUserId: {   // offer's listing id
        type: String,
        required: true,
        trim: true
    },
    otherUser: { 
        type: String,
        required: true,
        trim: true
    },
    otherUserOffer: { 
        type: String,
        required: true,
        trim: true
    },
    otherUserId: { 
        type: String,
        required: true,
        trim: true
    },
    type: {     // either "offer made" or "accepted". add rescind in its appropriate section when completed
        type: String,
        required: true,
        trim: true
    }
}, {
    collection: 'notif'
})

module.exports = mongoose.model('notif', NotifSchema)