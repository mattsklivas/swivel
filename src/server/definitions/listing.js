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
    date_created: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image_refs: [String],
    offers: [String]
}, {
    collection: 'listing'
})

module.exports = mongoose.model('listing', ListingSchema)