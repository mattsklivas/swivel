const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the Listing data model
const ListingModel = require('../definitions/listing')

// Import the Notification data model
const NotificationModel = require('../definitions/notification')

function routes(app) {
    // Find notifications by username
    router.get('/byUser/:username', async (req, res)=>{ // request contains user name
        try {
            // Get the user's active notifications
            let notifications = await NotificationModel.find({ user_to: req.params.username }) 
            res.status(200).json({ notifications: notifications })
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    // Create a new notification
    router.post('/', async (req, res)=>{
        try {
            const notificationResponse = new NotificationModel({
                user_to: req.body.user_to,
                user_from: req.body.user_from,
                user_listing_id: req.body.user_listing_id,
                user_listing_title: req.body.user_listing_title,
                user_from_listing_id: req.body.user_from_listing_id,
                user_from_listing_title: req.body.user_from_listing_title,
                type: req.body.type
            }).save()

            res.status(200).json({id: notificationResponse._id.toString()})
        } catch(err) {
            res.status(500).json({message: err})
        }
    })

    // Mark a user's notifications as seen
    router.post('/seen/:username', async (req, res)=>{
        try {
            const response = await NotificationModel.updateMany(
                {user_to: req.params.username}, 
                {seen: true}
            )

            res.status(200).json({message: 'success'})
        } catch(err) {
            res.status(500).json({message: err})
        }
    })

    return router
}
module.exports = routes