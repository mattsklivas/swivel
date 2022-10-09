// Import mongoose
const mongoose = require('mongoose')

// Data model for listings
const ListingSchema = new mongoose.Schema({
    creator: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    offers: [String]
}, {
    collection: 'listing'
})

module.exports = mongoose.model('listing', ListingSchema)