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

    // Add saved listing to user

    // Add offer to user

    return router
}

module.exports = routes