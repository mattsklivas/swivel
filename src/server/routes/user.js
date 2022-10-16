const express = require('express')

// Get the express Router object
const router = express.Router()

// Import the User data model
const UserModel = require('../definitions/user')

// Import the Listing data model
const ListingModel = require('../definitions/listing')

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
    router.patch('/profile/:nickname', async(req, res) => {
        try {
            // Update one
            const updatedUser = await UserModel.updateOne(
                {username: req.params.nickname}, 
                {$set: {location: req.body.location, fname: req.body.fname, lname: req.body.lname, description: req.body.description}}
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

    // Register user
    router.post('/register', async (req, res) => {
        try {
             // Check if username already exists, return 409 if so
            const existsUser = await UserModel.findOne({ username: req.body.username })
            const existsEmail = await UserModel.findOne({ email: req.body.email })

            if (existsUser) {
                return res.status(409).json({
                    message: 'An account with the username provided already exists',
                })
            }else if (existsEmail) {
                return res.status(409).json({
                    message: 'An account with the email provided already exists',
                })
            }else{
                // Build the user model and save it to the db
                const user = new UserModel({
                    email: req.body.email,
                    username: req.body.username,
                    fname: '',
                    lname: '',
                    location: '',
                    description: '',
                    avatar: ''
                })
                user.save().then(data=> {res.json(data)}).catch(err => {res.json({message: err.message})})
            }
        } catch (err) {
            // Return error 500 if an internal server error occurred
            res.status(500).json({ message: err.message })
        }
    })

    // Add saved listing to user
    // param: username is the user to add the saved_listing to
    // body: listingID is the listing as a ID string 
    router.patch('/savedListing/:username', async(req, res) => {
        try {
            // Get the string of the offer id from the body 
            const savedListingNew = req.body.listingID
            // Get current offerings
            const savedListing = await UserModel.find({username: req.params.username}).select('saved_listings')        
            // check if new offering exist in the current offering
            if(!savedListing[0].saved_listings.includes(savedListingNew)){
                savedListing[0].saved_listings.push(savedListingNew)
            }

            // Update accepted_listing
            const updateListing = await UserModel.updateOne(
                {username: req.params.username}, 
                {$set: {saved_listings: savedListing[0].saved_listings}})                             
            res.status(200).json(updateListing)      
        }catch(err){
            res.status(500).json({message: err})
        }
    })

    return router
}

module.exports = routes