const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the Listing data model
const ListingModel = require('../definitions/listing')
// Import the Notification data model
const NotifModel = require('../definitions/notification')

function routes(app) {
    // create new notification, with the required fields
    router.post('/notifUpdate', async (req, res)=>{
        // following block is to update notification model
        let listingUserName = null
        let listingUsertitle = null
        if(req.body.accepted_user === ''){
            // get the listing username and description 
            const data = await ListingModel.findById(req.body.accepted_id)
            listingUserName = data.creator
            listingUsertitle = data.title  
        }
        try{
            const updateNotif = new NotifModel({
                primaryUser: req.body.listing_user,  // user that has a listing, gets offered by 'otheruser' and optional: accepts their offer
                primaryUserId: req.body.listing_id,
                primaryUserOffer: req.body.listing_title,
                otherUser: req.body.accepted_user ==='' ? listingUserName : req.body.accepted_user, // user that offers their listing to 'primary user'
                otherUserId: req.body.accepted_id,
                otherUserOffer: req.body.accepted_title ===''? listingUsertitle : req.body.accepted_title,
                type: req.body.type
            })
            updateNotif.save().then(data=> {res.json(data)})
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // find notif by username, to show on the front end
    router.get('/getNotifs/:creator', async (req, res)=>{ // request contains user name
        // check all notifs for user name in either primary or other user
        try {
            const retrievedPrimaryUserListing = await NotifModel.find({ primaryUser: req.params.creator })   
            const retrievedOtherUserListing = await NotifModel.find({ otherUser: req.params.creator })  
            res.status(200).json(retrievedPrimaryUserListing.concat(retrievedOtherUserListing)) // returns all the notifs where the creator is involved
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    // Remove notififcation by id
    router.delete('/deleteNotif/:id', async(req,res) => {
        try {
            const removenotif = await NotifModel.deleteOne({_id: req.params.id})
            res.status(200).json(removenotif) // returns all the notifs where the creator is involved
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    return router
}
module.exports = routes