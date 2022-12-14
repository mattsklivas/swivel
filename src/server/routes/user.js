const express = require('express')

// Get the express Router object
const router = express.Router()

// For File Base64 and upload
const multer = require('multer')

// Import the User data model
const UserModel = require('../definitions/user')

// Import the Listing data model
const ListingModel = require('../definitions/listing')

// Store files temp. in memory for base64 conversion
const storage = multer.memoryStorage()
const upload = multer({ storage }) // Define upload

function routes(app) {
    // Get the profile details of a specific user
    router.get('/profile/:nickname', async (req, res) => {
        try {
            const user = await UserModel.findOne({ username: req.params.nickname})
            const listings = await ListingModel.find({
                creator: req.params.nickname
            })
            const saved = await ListingModel.find({_id: user.saved_listings})

            res.status(200).json({details: user, listings: listings, saved: saved})
        } catch (err) {
        res.status(500).json({ message: err.message })
        }
    })

    // Update a user's profile details
    router.patch('/profile/:nickname', upload.single('avatar') , async(req, res) => {
        try {
            let imageData = ''
            if(req?.file) {
                imageData = req.file.buffer.toString('base64')
            }

            // Update one
            const updatedUser = await UserModel.updateOne(
                {username: req.params.nickname}, 
                {$set: {location: req.body.location, fname: req.body.fname, lname: req.body.lname, description: req.body.description, avatar: imageData}}
            )
            res.status(200).json(updatedUser)
        } catch(err) {
            res.status(500).json({ message: err.message })
        }
    })

    // Get all users
    router.get('/all', async (req, res) => {
        try {
            const users = await UserModel.find()
            res.status(200).send({users: users})
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    })

    // Add saved listing to user
    // body: username is the user to add the saved_listing to, listing_id is the listing as a ID string 
    router.patch('/save_listing', async(req, res) => {
        try {
            // Get the string of the offer id from the body 
            const savedListingNew = req.body.listing_id
            // Get current offerings
            const savedListing = await UserModel.find({username: req.body.username}).select('saved_listings')        
            // check if new offering exist in the current offering
            if(!savedListing[0].saved_listings.includes(savedListingNew)){
                savedListing[0].saved_listings.push(savedListingNew)
            }

            // Update accepted_listing
            const updateListing = await UserModel.updateOne(
                {username: req.body.username}, 
                {$set: {saved_listings: savedListing[0].saved_listings}})                             
            res.status(200).json(updateListing)      
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    // Unsave a listing
    // body: username is the user for which to remove the saved listing, listing_id is the offer ID (string) to be removed
    router.patch('/unsave_listing', async(req,res) => {
        try{
            // $pullAll removes all instance of the value from the array
            const updateSavedListing = await UserModel.updateOne(
                {username: req.body.username}, 
                {$pullAll: {saved_listings: [req.body.listing_id]}})
            res.status(200).json(updateSavedListing)
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    return router
}

module.exports = routes